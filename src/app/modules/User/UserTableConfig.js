import React from "react";
import noPhoto from "../../../assets/no-photo.webp";

const columns = [
  {
    id: "profileImage",
    label: "Profile Image",
    align: "left",
    sort: false,
  },
  {
    id: "userId",
    label: "User Id",
    align: "left",
    sort: false,
  },
  {
    id: "firstName",
    label: "First Name",
    align: "left",
    sort: false,
  },
  {
    id: "lastName",
    label: "Last Name",
    align: "left",
    sort: false,
  },
  {
    id: "userRole",
    label: "User Role",
    align: "left",
    sort: false,
  },
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "160px", width: "160px" },
  },
];

const getFormattedData = (userData) => ({
  id: {
    display: false,
    label: "User Id",
    data: userData.user_id,
  },
  profileImage: {
    label: "Profile Image",
    align: "left",
    // url: assetsIp + userData.profile_image,
    data: (
      <img
        src={userData.profile_image || noPhoto}
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
    display: true,
  },
  userId: {
    align: "left",
    display: true,
    label: "User Id",
    data: userData.user_id,
  },
  firstName: {
    align: "left",
    label: "First Name",
    display: true,
    data: userData.first_name,
  },
  lastName: {
    align: "left",
    label: "Last Name",
    display: true,
    data: userData.last_name,
  },
  userRole: {
    align: "left",
    label: "User Role",
    display: true,
    data: userData.user_role,
  },
});

const UserTableConfig = {
  getFormattedData,
  columns,
};

export default UserTableConfig;
