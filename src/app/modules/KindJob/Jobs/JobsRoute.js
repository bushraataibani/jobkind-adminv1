import React, { createContext } from "react";
import Jobs from "./Jobs";

export const JobsContext = createContext(null);

export default function JobsRoute() {
  const UIEvents = {
    // addJobs: () => {
    //   history.push(`/jobs/add`);
    // },
    // openViewJobsDialog: (id) => {
    //   history.push(`/jobs/${id}/view`);
    // },
    // deleteJobs: (id) => {
    //   history.push(`/jobs/${id}/delete`);
    // },
  };

  return (
    <JobsContext.Provider value={UIEvents}>
      <Jobs />
    </JobsContext.Provider>
  );
}
