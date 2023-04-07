import { lazy } from "react";
import { DashboardPage } from "./pages/DashboardPage";

const User = lazy(() =>
  import("./modules/User/UserRoute" /* webpackChunkName: "user" */)
);

const College = lazy(() =>
  import(
    "./modules/Master/components/College/CollegeRoute" /* webpackChunkName: "master>college" */
  )
);

const Department = lazy(() =>
  import(
    "./modules/Master/components/Department/DepartmentRoute" /* webpackChunkName: "master>department" */
  )
);

const Industry = lazy(() =>
  import(
    "./modules/Master/components/Industry/IndustryRoute" /* webpackChunkName: "master>industry" */
  )
);

const Skill = lazy(() =>
  import(
    "./modules/Master/components/Skill/SkillRoute" /* webpackChunkName: "master>skill" */
  )
);

const Language = lazy(() =>
  import(
    "./modules/Master/components/Language/LanguageRoute" /* webpackChunkName: "master>language" */
  )
);

const Education = lazy(() =>
  import(
    "./modules/Master/components/Education/EducationRoute" /* webpackChunkName: "master>education" */
  )
);

const Degree = lazy(() =>
  import(
    "./modules/Master/components/Degree/DegreeRoute" /* webpackChunkName: "master>degree" */
  )
);

const Specialization = lazy(() =>
  import(
    "./modules/Master/components/Specialization/SpecializationRoute" /* webpackChunkName: "master>specialization" */
  )
);

const Country = lazy(() =>
  import(
    "./modules/Master/components/Country/CountryRoute" /* webpackChunkName: "master>country" */
  )
);

const State = lazy(() =>
  import(
    "./modules/Master/components/State/StateRoute" /* webpackChunkName: "master>state" */
  )
);

const City = lazy(() =>
  import(
    "./modules/Master/components/City/CityRoute" /* webpackChunkName: "master>city" */
  )
);

export const customRoutes = () => [
  {
    path: "/dashboard",
    Component: DashboardPage,
    isActive: true,
  },
  {
    path: "/users",
    Component: User,
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
];
