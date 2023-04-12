import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import TableCellExpandList from "../../../../Helpers/Table/TableCellExpandList";
import { getCurrentDateTime } from "../../../../Utils/utils";

const columns = [
  {
    id: "plan_id",
    label: "Plan Id",
    align: "left",
    sort: false,
    rowSpan: 2,
  },
  {
    id: "title",
    label: "Plan Name",
    align: "left",
    sort: false,
    rowSpan: 2,
  },
  {
    id: "total_application",
    label: "Total Application",
    align: "left",
    sort: false,
    rowSpan: 2,
  },
  {
    id: "coins",
    label: "Coins",
    align: "left",
    sort: false,
    rowSpan: 2,
  },
  {
    id: "note",
    label: "Note",
    align: "left",
    sort: false,
    rowSpan: 2,
  },
  {
    id: "plan_meta",
    label: "Plan Meta",
    align: "left",
    sort: false,
    colSpan: 3,
    styles: { textAlign: "-webkit-center" },
  },
  {
    id: "created_datetime",
    label: "Created At",
    align: "left",
    sort: false,
    rowSpan: 2,
  },
  {
    id: "updated_datetime",
    label: "Updated At",
    align: "left",
    sort: false,
    rowSpan: 2,
  },
  {
    id: "is_popular",
    label: "Popular?",
    align: "left",
    sort: false,
    styles: { maxWidth: "100px", width: "100px" },
    rowSpan: 2,
  },
  {
    id: "is_active",
    label: "Status",
    align: "left",
    sort: false,
    styles: { maxWidth: "100px", width: "100px" },
    rowSpan: 2,
  },
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "160px", width: "160px" },
    rowSpan: 2,
  },
];

export const subColumns = [
  {
    id: "plan_meta_id",
    label: "Plan Meta Id",
    align: "left",
    sort: false,
  },
  {
    id: "type",
    label: "Total Application",
    align: "left",
    sort: false,
  },
  {
    id: "meta_title",
    label: "Coins",
    align: "left",
    sort: false,
  },
];

const getFormattedData = (planData) => {
  let planMetaData = planData?.plan_meta;

  return {
    id: {
      display: false,
      label: "Plan id",
      data: planData.plan_id,
    },
    plan_id: {
      align: "left",
      display: true,
      label: "Plan Id",
      data: planData.plan_id,
    },
    title: {
      align: "left",
      label: "Plan Name",
      display: true,
      data: planData.title,
    },
    total_application: {
      align: "left",
      label: "Total Application",
      display: true,
      data: planData.total_application,
    },
    coins: {
      align: "left",
      label: "Coin",
      display: true,
      data: planData.coins,
    },
    note: {
      align: "left",
      label: "Note",
      display: true,
      data: planData.note,
    },
    plan_meta_id: {
      align: "left",
      label: "Meta ID",
      display: true,
      data: (
        <TableCellExpandList
          list={planMetaData || "-"}
          minItemsToShow={2}
          renderItem={(plan) => (
            <div key={plan?.plan_meta_id}>
              {planMetaData?.length === 0 ? "-" : plan?.plan_meta_id}
            </div>
          )}
          containerStyles={{ maxHeight: "300px", overflow: "auto" }}
        />
      ),
    },
    type: {
      align: "left",
      label: "Meta Type",
      display: true,
      data: (
        <TableCellExpandList
          list={planMetaData || "-"}
          minItemsToShow={2}
          renderItem={(plan) => (
            <div key={plan?.plan_meta_id}>
              {planMetaData?.length === 0 ? "-" : plan?.type}
            </div>
          )}
          containerStyles={{ maxHeight: "300px", overflow: "auto" }}
        />
      ),
    },
    meta_title: {
      align: "left",
      label: "Meta Title",
      display: true,
      data: (
        <TableCellExpandList
          list={planMetaData || "-"}
          minItemsToShow={2}
          renderItem={(plan) => (
            <div key={plan?.plan_meta_id}>
              {planMetaData?.length === 0 ? "-" : plan?.title}
            </div>
          )}
          containerStyles={{ maxHeight: "300px", overflow: "auto" }}
        />
      ),
    },
    created_datetime: {
      align: "left",
      label: "Created At",
      display: true,
      data:
        planData.created_datetime !== null
          ? getCurrentDateTime(new Date(planData.created_datetime))
          : "-",
    },
    updated_datetime: {
      align: "left",
      label: "Updated At",
      display: true,
      data:
        planData.updated_datetime !== null
          ? getCurrentDateTime(new Date(planData.updated_datetime))
          : "-",
    },
    is_popular: {
      align: "left",
      label: "Popular?",
      display: true,
      data: (
        <Box
          sx={{
            backgroundColor:
              planData.is_popular === true
                ? "rgb(1, 171, 52, 20%)"
                : "rgb(216, 17, 17, 20%)",
            color:
              planData.is_popular === true
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
          {planData.is_popular === true ? "Active" : "Inactive"}
        </Box>
      ),
      dataIs: planData.is_popular === true ? true : false,
    },
    is_active: {
      align: "left",
      label: "Status",
      display: true,
      data: (
        <Box
          sx={{
            backgroundColor:
              planData.is_active === 1
                ? "rgb(1, 171, 52, 20%)"
                : "rgb(216, 17, 17, 20%)",
            color:
              planData.is_active === 1
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
          {planData.is_active === 1 ? "Active" : "Inactive"}
        </Box>
      ),
      dataIs: planData.is_active === 1 ? true : false,
    },
  };
};

const PlanTableConfig = {
  getFormattedData,
  columns,
};

export default PlanTableConfig;
