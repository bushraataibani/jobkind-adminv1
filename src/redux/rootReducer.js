import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import * as auth from "../app/modules/Auth/_redux/authRedux";
import { AreaSlice } from "../app/modules/KindJob/_redux/Area/AreaSlice";
import { CitySlice } from "../app/modules/KindJob/_redux/City/CitySlice";
import { CollegeSlice } from "../app/modules/KindJob/_redux/College/CollegeSlice";
import { CountrySlice } from "../app/modules/KindJob/_redux/Country/CountrySlice";
import { DegreeSlice } from "../app/modules/KindJob/_redux/Degree/DegreeSlice";
import { DepartmentSlice } from "../app/modules/KindJob/_redux/Department/DepartmentSlice";
import { EducationSlice } from "../app/modules/KindJob/_redux/Education/EducationSlice";
import { IndustrySlice } from "../app/modules/KindJob/_redux/Industry/IndustrySlice";
import { JobSlice } from "../app/modules/KindJob/_redux/Job/JobSlice";
import { LanguageSlice } from "../app/modules/KindJob/_redux/Language/LanguageSlice";
import { PermissionProfileSlice } from "../app/modules/KindJob/_redux/PermissionProfile/PermissionProfileSlice";
import { PlanSlice } from "../app/modules/KindJob/_redux/Plan/PlanSlice";
import { RoleSlice } from "../app/modules/KindJob/_redux/Role/RoleSlice";
import { SkillSlice } from "../app/modules/KindJob/_redux/Skill/SkillSlice";
import { SpecializationSlice } from "../app/modules/KindJob/_redux/Specialization/SpecializationSlice";
import { StaffSlice } from "../app/modules/KindJob/_redux/Staff/StaffSlice";
import { StateSlice } from "../app/modules/KindJob/_redux/State/StateSlice";
import { SubscribeSlice } from "../app/modules/KindJob/_redux/Subscribe/SubscribeSlice";
import { generalSlice } from "../app/modules/KindJob/_redux/general/generalSlice";
import { EmployeeSlice } from "../app/modules/KindJob/_redux/Employee/EmployeeSlice";
import { EmployerSlice } from "../app/modules/KindJob/_redux/Employer/EmployerSlice";

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
  subscribe: SubscribeSlice.reducer,
  employee: EmployeeSlice.reducer,
  employer: EmployerSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
