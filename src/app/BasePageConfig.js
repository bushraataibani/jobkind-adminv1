import { lazy } from "react";
import { DashboardPage } from "./pages/DashboardPage";

const User = lazy(() => import("./pages/UserPage"));
const Master = lazy(() => import("./pages/MasterPage"));

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
    path: "/master",
    Component: Master,
    isActive: true,
  },
];
