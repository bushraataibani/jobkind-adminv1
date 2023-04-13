import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import * as auth from "../app/modules/Auth/_redux/authRedux";
import { CollegeSlice } from "../app/modules/KindJob/_redux/College/CollegeSlice";
import { DepartmentSlice } from "../app/modules/KindJob/_redux/Department/DepartmentSlice";
import { generalSlice } from "../app/modules/KindJob/_redux/general/generalSlice";
import { IndustrySlice } from "../app/modules/KindJob/_redux/Industry/IndustrySlice";
import { LanguageSlice } from "../app/modules/KindJob/_redux/Language/LanguageSlice";
import { SkillSlice } from "../app/modules/KindJob/_redux/Skill/SkillSlice";
import { EducationSlice } from "../app/modules/KindJob/_redux/Education/EducationSlice";
import { DegreeSlice } from "../app/modules/KindJob/_redux/Degree/DegreeSlice";
import { SpecializationSlice } from "../app/modules/KindJob/_redux/Specialization/SpecializationSlice";
import { CountrySlice } from "../app/modules/KindJob/_redux/Country/CountrySlice";
import { StateSlice } from "../app/modules/KindJob/_redux/State/StateSlice";
import { CitySlice } from "../app/modules/KindJob/_redux/City/CitySlice";
import { AreaSlice } from "../app/modules/KindJob/_redux/Area/AreaSlice";
import { RoleSlice } from "../app/modules/KindJob/_redux/Role/RoleSlice";
import { JobSlice } from "../app/modules/KindJob/_redux/Job/JobSlice";
import { PlanSlice } from "../app/modules/KindJob/_redux/Plan/PlanSlice";
import { StaffSlice } from "../app/modules/KindJob/_redux/Staff/StaffSlice";
import { PermissionProfileSlice } from "../app/modules/KindJob/_redux/PermissionProfile/PermissionProfileSlice";

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
  job: JobSlice.reducer,
  plan: PlanSlice.reducer,
  staff: StaffSlice.reducer,
  permission: PermissionProfileSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
