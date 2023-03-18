const columns = [
  {
    id: "collage_id",
    label: "College Id",
    align: "left",
    sort: true,
  },
  {
    id: "collage_name",
    label: "College Name",
    align: "left",
    sort: false,
  },
  {
    id: "address",
    label: "Address",
    align: "left",
    sort: true,
  },
  {
    id: "created_datetime",
    label: "Created At",
    align: "left",
    sort: true,
  },
  {
    id: "updated_datetime",
    label: "Updated At",
    align: "left",
    sort: true,
  },
  {
    id: "is_deleted",
    label: "Deleted?",
    align: "left",
    sort: true,
  },
  {
    id: "is_active",
    label: "Active?",
    align: "left",
    sort: true,
  },
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "160px", width: "160px" },
  },
];

const getFormattedData = (collegeData) => ({
  id: {
    display: false,
    label: "Collage id",
    data: collegeData.collage_id,
  },
  collage_id: {
    align: "left",
    display: true,
    label: "College Id",
    data: collegeData.collage_id,
  },
  collage_name: {
    align: "left",
    label: "College Name",
    display: true,
    data: collegeData.collage_name,
  },
  address: {
    align: "left",
    label: "Address",
    display: true,
    data: collegeData.address,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data: collegeData.created_datetime,
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data: collegeData.updated_datetime,
  },
  is_deleted: {
    align: "left",
    label: "Deleted?",
    display: true,
    data: collegeData.is_deleted,
  },
  is_active: {
    align: "left",
    label: "Active?",
    display: true,
    data: collegeData.is_active,
  },
});

const CollegeTableConfig = {
  getFormattedData,
  columns,
};

export default CollegeTableConfig;
