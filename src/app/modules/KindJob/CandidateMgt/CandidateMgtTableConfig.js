import { getCurrentDateTime } from "../../Utils/utils";

const columns = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
  },
  {
    id: "keyword",
    label: "Keyword",
    align: "left",
    sort: false,
  },
  {
    id: "description",
    label: "Description",
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
    styles: { maxWidth: "100px", width: "100px" },
  },
];

const getFormattedData = (candidateMgtData, index) => ({
  id: {
    display: false,
    label: "CandidateMgt id",
    data: candidateMgtData.candidateMgt_id,
  },
  page_slug_id: {
    align: "left",
    display: false,
    label: "Page Slug Id",
    data: candidateMgtData.page_slug_id,
  },
  sr_no: {
    align: "left",
    display: true,
    label: "Sr No",
    data: index + 1,
  },
  keyword: {
    align: "left",
    label: "Keyword",
    display: true,
    data: candidateMgtData.keyword,
  },
  description: {
    align: "left",
    label: "Description",
    display: true,
    data: candidateMgtData.description,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      candidateMgtData.created_datetime !== null
        ? getCurrentDateTime(new Date(candidateMgtData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      candidateMgtData.updated_datetime !== null
        ? getCurrentDateTime(new Date(candidateMgtData.updated_datetime))
        : "-",
  },
});

const CandidateMgtTableConfig = {
  getFormattedData,
  columns,
};

export default CandidateMgtTableConfig;
