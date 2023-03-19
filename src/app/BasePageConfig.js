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
];
