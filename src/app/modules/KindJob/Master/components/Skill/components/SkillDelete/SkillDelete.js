import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteSkillFromServer,
  getAllSkill,
} from "../../../_redux/Skill/SkillCrud";
import { SkillSlice } from "../../../_redux/Skill/SkillSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";

const SkillDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = SkillSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedSkill, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedSkill: state.skill.selectedSkill,
      filter: state.skill.filter,
      page: state.skill.page,
      dataPerPage: state.skill.dataPerPage,
    }),
    shallowEqual
  );

  const deleteSkill = () => {
    return deleteSkillFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Skill", "deleted"),
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

  return (
    <DeleteModal
      show={show}
      cancelHandler={onHide}
      deleteHandler={deleteSkill}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Skill"
      selectedData={selectedSkill && selectedSkill?.title?.data}
    />
  );
};

export default SkillDelete;
