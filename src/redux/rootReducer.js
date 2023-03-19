import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import * as auth from "../app/modules/Auth/_redux/authRedux";
import { CollegeSlice } from "../app/modules/_redux/College/CollegeSlice";
import { DepartmentSlice } from "../app/modules/_redux/Department/DepartmentSlice";
import { generalSlice } from "../app/modules/_redux/general/generalSlice";
import { IndustrySlice } from "../app/modules/_redux/Industry/IndustrySlice";
import { LanguageSlice } from "../app/modules/_redux/Language/LanguageSlice";
import { SkillSlice } from "../app/modules/_redux/Skills/SkillSlice";

export const rootReducer = combineReducers({
  general: generalSlice.reducer,
  auth: auth.reducer,
  college: CollegeSlice.reducer,
  Department: DepartmentSlice.reducer,
  Industry: IndustrySlice.reducer,
  Language: LanguageSlice.reducer,
  Skill: SkillSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
