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
    styles: { maxWidth: "160px", width: "160px" },
  },
];

const getFormattedData = (seoData, index) => ({
  id: {
    display: false,
    label: "Seo id",
    data: seoData.seo_id,
  },
  page_slug_id: {
    align: "left",
    display: false,
    label: "Page Slug Id",
    data: seoData.page_slug_id,
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
    data: seoData.keyword,
  },
  description: {
    align: "left",
    label: "Description",
    display: true,
    data: seoData.description,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      seoData.created_datetime !== null
        ? getCurrentDateTime(new Date(seoData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      seoData.updated_datetime !== null
        ? getCurrentDateTime(new Date(seoData.updated_datetime))
        : "-",
  },
});

const SeoTableConfig = {
  getFormattedData,
  columns,
};

export default SeoTableConfig;
