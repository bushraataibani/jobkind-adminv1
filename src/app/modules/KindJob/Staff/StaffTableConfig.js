import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../Utils/utils";
import noPhoto from "../../../../assets/no-photo.webp";

const columns = [
  {
    id: "user_id",
    label: "User Id",
    align: "left",
    sort: false,
  },
  {
    id: "permission_profile_id",
    label: "Permission Profile Id",
    align: "left",
    sort: false,
  },
  {
    id: "gender",
    label: "Gender",
    align: "left",
    sort: false,
  },
  {
    id: "first_name",
    label: "First Name",
    align: "left",
    sort: false,
  },
  {
    id: "last_name",
    label: "Last Name",
    align: "left",
    sort: false,
  },
  {
    id: "address",
    label: "Address",
    align: "left",
    sort: false,
  },
  {
    id: "dob",
    label: "DOB",
    align: "left",
    sort: false,
  },
  {
    id: "password",
    label: "Password",
    align: "left",
    sort: false,
  },
  {
    id: "phone_number",
    label: "Phone Number",
    align: "left",
    sort: false,
  },
  {
    id: "profile_image",
    label: "Profile Image",
    align: "left",
    sort: false,
  },
  {
    id: "created_datetime",
    label: "Created At",
    align: "left",
    sort: false,
  },
  {
    id: "updated_datetime",
    label: "Updated At",
    align: "left",
    sort: false,
  },
  {
    id: "is_active",
    label: "Status",
    align: "left",
    sort: false,
    styles: { maxWidth: "100px", width: "100px" },
  },
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "160px", width: "160px" },
  },
];

const getFormattedData = (staffData) => ({
  id: {
    display: false,
    label: "Staff id",
    data: staffData.user_id,
  },
  user_id: {
    align: "left",
    display: true,
    label: "Staff Id",
    data: staffData.user_id,
  },
  permission_profile_id: {
    align: "left",
    label: "Staff Name",
    display: true,
    data: staffData.permission_profile_id,
  },
  gender: {
    align: "left",
    label: "Gender",
    display: true,
    data: staffData.gender === 1 ? "Male" : "Female",
  },
  first_name: {
    align: "left",
    label: "First Name",
    display: true,
    data: staffData.first_name,
  },
  last_name: {
    align: "left",
    label: "Last Name",
    display: true,
    data: staffData.last_name,
  },
  address: {
    align: "left",
    label: "Address",
    display: true,
    data: staffData.address,
  },
  dob: {
    align: "left",
    label: "DOB",
    display: true,
    data: getCurrentDateTime(new Date(staffData.dob), false, false),
  },
  password: {
    align: "left",
    label: "Password",
    display: true,
    data: staffData.password,
  },
  phone_number: {
    align: "left",
    label: "Phone Number",
    display: true,
    data: staffData.phone_number,
  },
  profile_image: {
    align: "left",
    label: "Profile Image",
    display: true,
    data: (
      <img
        src={staffData.profile_image || noPhoto}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = `${noPhoto}`;
        }}
        style={{
          objectFit: "contain",
          width: "auto",
          height: "auto",
          maxWidth: "80px",
          maxHeight: "80px",
        }}
        alt="Background_Image"
      />
    ),
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      staffData.created_datetime !== null
        ? getCurrentDateTime(new Date(staffData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      staffData.updated_datetime !== null
        ? getCurrentDateTime(new Date(staffData.updated_datetime))
        : "-",
  },
  is_active: {
    align: "left",
    label: "Status",
    display: true,
    data: (
      <Box
        sx={{
          backgroundColor:
            staffData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            staffData.is_active === 1
              ? "rgb(1, 171, 52, 90%)"
              : "rgb(216, 17, 17, 90%)",
          borderRadius: "10px",
          padding: "0px 5px 0px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "3px",
        }}
      >
        <FiberManualRecordIcon />
        {staffData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: staffData.is_active === 1 ? true : false,
  },
});

const StaffTableConfig = {
  getFormattedData,
  columns,
};

export default StaffTableConfig;
