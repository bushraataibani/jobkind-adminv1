import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import { addSkillToServer, getAllSkill } from "../../../_redux/Skill/SkillCrud";
import { SkillSlice } from "../../../_redux/Skill/SkillSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import SkillAddForm from "./SkillAddForm";

const SkillAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = SkillSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.skill.filter,
      page: state.skill.page,
      dataPerPage: state.skill.dataPerPage,
    }),
    shallowEqual
  );

  const addSkill = (data) => {
    const dataToServer = cleanObject(data);

    return addSkillToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Skill", "added"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllSkill({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllSkill(res?.data?.data?.skill_data?.rows));
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.skill_data?.count,
            })
          );
        })
        .catch((error) => console.error(error))
        .finally(() => {
          dispatch(
            actions.setPageConfigData({
              type: "SET_IS_LOADING",
              data: false,
            })
          );
        });
    });
  };

  return <SkillAddForm show={show} onHide={onHide} addSkill={addSkill} />;
};

export default SkillAdd;
