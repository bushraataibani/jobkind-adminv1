import { lazy } from "react";
import { DashboardPage } from "./pages/DashboardPage";

const College = lazy(() =>
  import(
    "./modules/KindJob/Master/components/College/CollegeRoute" /* webpackChunkName: "master>college" */
  )
);

const Department = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Department/DepartmentRoute" /* webpackChunkName: "master>department" */
  )
);

const Industry = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Industry/IndustryRoute" /* webpackChunkName: "master>industry" */
  )
);

const Skill = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Skill/SkillRoute" /* webpackChunkName: "master>skill" */
  )
);

const Language = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Language/LanguageRoute" /* webpackChunkName: "master>language" */
  )
);

const Education = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Education/EducationRoute" /* webpackChunkName: "master>education" */
  )
);

const Degree = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Degree/DegreeRoute" /* webpackChunkName: "master>degree" */
  )
);

const Specialization = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Specialization/SpecializationRoute" /* webpackChunkName: "master>specialization" */
  )
);

const Country = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Country/CountryRoute" /* webpackChunkName: "master>country" */
  )
);

const State = lazy(() =>
  import(
    "./modules/KindJob/Master/components/State/StateRoute" /* webpackChunkName: "master>state" */
  )
);

const City = lazy(() =>
  import(
    "./modules/KindJob/Master/components/City/CityRoute" /* webpackChunkName: "master>city" */
  )
);

const Area = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Area/AreaRoute" /* webpackChunkName: "master>area" */
  )
);

const Role = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Role/RoleRoute" /* webpackChunkName: "master>role" */
  )
);

const Job = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Job/JobRoute" /* webpackChunkName: "master>job" */
  )
);

const Plan = lazy(() =>
  import(
    "./modules/KindJob/Master/components/Plan/PlanRoute" /* webpackChunkName: "master>plan" */
  )
);

const Staff = lazy(() =>
  import(
    "./modules/KindJob/Staff/StaffRoute" /* webpackChunkName: "master>staff" */
  )
);

export const customRoutes = () => [
  {
    path: "/dashboard",
    Component: DashboardPage,
    isActive: true,
  },
  {
    path: "/master/college",
    Component: College,
    isActive: true,
  },
  {
    path: "/master/department",
    Component: Department,
    isActive: true,
  },
  {
    path: "/master/industry",
    Component: Industry,
    isActive: true,
  },
  {
    path: "/master/skill",
    Component: Skill,
    isActive: true,
  },
  {
    path: "/master/language",
    Component: Language,
    isActive: true,
  },
  {
    path: "/master/education",
    Component: Education,
    isActive: true,
  },
  {
    path: "/master/degree",
    Component: Degree,
    isActive: true,
  },
  {
    path: "/master/specialization",
    Component: Specialization,
    isActive: true,
  },
  {
    path: "/master/country",
    Component: Country,
    isActive: true,
  },
  {
    path: "/master/state",
    Component: State,
    isActive: true,
  },
  {
    path: "/master/city",
    Component: City,
    isActive: true,
  },
  {
    path: "/master/area",
    Component: Area,
    isActive: true,
  },
  {
    path: "/master/role",
    Component: Role,
    isActive: true,
  },
  {
    path: "/master/job",
    Component: Job,
    isActive: true,
  },
  {
    path: "/master/plan",
    Component: Plan,
    isActive: true,
  },
  {
    path: "/staff",
    Component: Staff,
    isActive: true,
  },
];
