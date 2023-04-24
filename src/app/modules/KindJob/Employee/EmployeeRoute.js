import React, { createContext } from "react";
import Employee from "./Employee";

export const EmployeeContext = createContext(null);

export default function EmployeeRoute() {
  return (
    <EmployeeContext.Provider>
      <Employee />
    </EmployeeContext.Provider>
  );
}
