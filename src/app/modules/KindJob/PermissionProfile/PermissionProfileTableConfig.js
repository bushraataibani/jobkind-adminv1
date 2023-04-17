import { getCurrentDateTime } from "../../Utils/utils";

const columns = [
  {
    id: "permission_profile_id",
    label: "Permission Profile Id",
    align: "left",
    sort: false,
  },
  {
    id: "title",
    label: "Permission Name",
    align: "left",
    sort: false,
  },
  {
    id: "role",
    label: "Role",
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
    label: "Actions",
    align: "center",
    styles: { maxWidth: "160px", width: "160px" },
  },
];

const getFormattedData = (permissionData) => {
  return {
    id: {
      display: false,
      label: "Permission id",
      data: permissionData.permission_profile_id,
    },
    permission_profile_id: {
      align: "left",
      label: "Permission Profile ID",
      display: true,
      data: permissionData.permission_profile_id,
    },
    title: {
      align: "left",
      label: "Permission Name",
      display: true,
      data: permissionData.title,
    },
    role: {
      align: "left",
      label: "Role",
      display: true,
      data: permissionData.role_id,
    },
    permissionData: {
      align: "left",
      label: "Role",
      display: false,
      // data: allPermissionData,
    },
    created_datetime: {
      align: "left",
      label: "Created At",
      display: true,
      data:
        permissionData.created_datetime !== null
          ? getCurrentDateTime(new Date(permissionData.created_datetime))
          : "-",
    },
    updated_datetime: {
      align: "left",
      label: "Updated At",
      display: true,
      data:
        permissionData.updated_datetime !== null
          ? getCurrentDateTime(new Date(permissionData.updated_datetime))
          : "-",
    },
  };
};

const PermissionTableConfig = {
  getFormattedData,
  columns,
};

export default PermissionTableConfig;
