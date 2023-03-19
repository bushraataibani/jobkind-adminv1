import { Paper } from "@mui/material";
import React from "react";
import UserTable from "./components/UserTable/UserTable";

const User = () => {
  const allUsers = [
    {
      user_id: 1,
      first_name: "Admin",
      last_name: "KindJob",
      profile_image: "",
      user_role: 1,
    },
    {
      user_id: 2,
      first_name: "Admin",
      last_name: "KindJob",
      profile_image: "",
      user_role: 2,
    },
    {
      user_id: 3,
      first_name: "Admin",
      last_name: "KindJob",
      profile_image: "",
      user_role: 3,
    },
  ];

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <UserTable
        allUsers={allUsers}
        // page={page}
        // licenseFeatures={licenseFeatures}
        // filter={filter}
        // dataCount={dataCount}
        // dataPerPage={dataPerPage}
        // handleRequestSort={handleRequestSort}
        // refreshHandler={refreshHandler}
        // permissions={permissions}
      />
    </Paper>
  );
};

export default User;
