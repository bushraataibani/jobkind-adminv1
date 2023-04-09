import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import * as auth from "../app/modules/Auth/_redux/authRedux";
import { AreaSlice } from "../app/modules/_redux/Area/AreaSlice";
import { CitySlice } from "../app/modules/_redux/City/CitySlice";
import { CollegeSlice } from "../app/modules/_redux/College/CollegeSlice";
import { CountrySlice } from "../app/modules/_redux/Country/CountrySlice";
import { DegreeSlice } from "../app/modules/_redux/Degree/DegreeSlice";
import { DepartmentSlice } from "../app/modules/_redux/Department/DepartmentSlice";
import { EducationSlice } from "../app/modules/_redux/Education/EducationSlice";
import { generalSlice } from "../app/modules/_redux/general/generalSlice";
import { IndustrySlice } from "../app/modules/_redux/Industry/IndustrySlice";
import { LanguageSlice } from "../app/modules/_redux/Language/LanguageSlice";
import { RoleSlice } from "../app/modules/_redux/Role/RoleSlice";
import { SkillSlice } from "../app/modules/_redux/Skill/SkillSlice";
import { SpecializationSlice } from "../app/modules/_redux/Specialization/SpecializationSlice";
import { StateSlice } from "../app/modules/_redux/State/StateSlice";

export const rootReducer = combineReducers({
  general: generalSlice.reducer,
  auth: auth.reducer,
  college: CollegeSlice.reducer,
  department: DepartmentSlice.reducer,
  industry: IndustrySlice.reducer,
  language: LanguageSlice.reducer,
  skill: SkillSlice.reducer,
  education: EducationSlice.reducer,
  degree: DegreeSlice.reducer,
  specialization: SpecializationSlice.reducer,
  country: CountrySlice.reducer,
  state: StateSlice.reducer,
  city: CitySlice.reducer,
  area: AreaSlice.reducer,
  role: RoleSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
