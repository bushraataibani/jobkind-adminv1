const columns = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
    styles: { maxWidth: "100px", width: "100px" },
  },
  {
    id: "name",
    label: "Name",
    align: "left",
    sort: false,
    styles: { maxWidth: "100px", width: "100px" },
  },
  {
    id: "email",
    label: "E-mail",
    align: "left",
    sort: false,
    styles: { maxWidth: "100px", width: "100px" },
  },
  {
    id: "phone_number",
    label: "Phone Number",
    align: "left",
    sort: false,
    styles: { maxWidth: "100px", width: "100px" },
  },
  {
    id: "total_jobs",
    label: "Total Job",
    align: "left",
    sort: false,
    styles: { maxWidth: "100px", width: "100px", textAlign: "-webkit-center" },
  },
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "100px", width: "100px", textAlign: "-webkit-center" },
  },
];

const getFormattedData = (appliedJobData, index) => ({
  id: {
    display: false,
    label: "User id",
    data: appliedJobData.user_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  name: {
    align: "left",
    label: "Name",
    display: true,
    data: `${appliedJobData.first_name} ${appliedJobData.last_name}`,
  },
  email: {
    align: "left",
    label: "E-mail",
    display: true,
    data: appliedJobData.email ? appliedJobData.email : "-",
  },
  phone_number: {
    align: "left",
    label: "Phone Number",
    display: true,
    data: appliedJobData.phone_number,
  },
  total_jobs: {
    align: "center",
    display: true,
    label: "Total Jobs",
    data: appliedJobData.total_jobs === 0 ? "0" : appliedJobData.total_jobs,
  },
});

const AppliedJobTableConfig = {
  getFormattedData,
  columns,
};

export default AppliedJobTableConfig;
