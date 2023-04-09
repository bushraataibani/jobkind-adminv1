import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllSkill } from "../../../_redux/Skill/SkillCrud";
import { SkillSlice } from "../../../_redux/Skill/SkillSlice";
import SkillTable from "./components/SkillTable/SkillTable";

const Skill = () => {
  const dispatch = useDispatch();
  const { actions } = SkillSlice;

  const { allSkill, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allSkill: state.skill.allSkill,
      filter: state.skill.filter,
      page: state.skill.page,
      dataPerPage: state.skill.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
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
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dataPerPage]);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <SkillTable allSkill={allSkill} getAllData={getAllData} />
    </Paper>
  );
};

export default Skill;
