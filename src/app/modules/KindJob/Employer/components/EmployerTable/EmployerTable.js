import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BlockIcon from "@mui/icons-material/Block";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import { EmployerContext } from "../../EmployerRoute";
import { getEmployerProfile } from "../../../_redux/Employer/EmployerCrud";
import EmployerTableConfig from "../../EmployerTableConfig";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";

const EmployerTable = ({ allEmployer, getAllData }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { actions } = EmployerSlice;
  const context = useContext(EmployerContext);
  const [rowData, setRowData] = useState([]);

  const {
    isLoading,
    filter,
    empPage,
    empDataCount,
    empDataPerPage,
  } = useSelector(
    (state) => ({
      isLoading: state.employer.isLoading,
      filter: state.employer.filter,
      empPage: state.employer.empPage,
      empDataCount: state.employer.empDataCount,
      empDataPerPage: state.employer.empDataPerPage,
    }),
    shallowEqual
  );

  const getEmployerProfileData = (id) => {
    dispatch(actions.setLoading(true));
    return getEmployerProfile(id)
      .then((res) => {
        dispatch(actions.setAllEmpProfile(res?.data?.data));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(
          actions.setEmpPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
        dispatch(actions.setLoading(false));
      });
  };

  const handleBlock = (row) => {
    dispatch(actions.employerFetched(row));
    context.blockEmployer(row.id.data);
  };

  const handleProfile = (row) => {
    dispatch(actions.employerFetched(row));
    context.employerProfileView(row.id.data);
    getEmployerProfileData(row.id.data);
  };

  const renderBtn = (row) => {
    return (
      <>
        <Tooltip
          disableInteractive={true}
          arrow
          title="Employer Profile"
          placement="bottom"
        >
          <IconButton
            aria-label="Employer Profile"
            onClick={() => handleProfile(row)}
            sx={{
              padding: "5px",
              borderRadius: "5px",
            }}
            style={{
              backgroundColor: "#242368",
            }}
          >
            <AccountBoxIcon
              sx={{
                width: "1.6rem",
                height: "1.6rem",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          disableInteractive={true}
          arrow
          title="Block Employer?"
          placement="bottom"
        >
          <IconButton
            aria-label="Block Employer?"
            onClick={() => handleBlock(row)}
            sx={{
              padding: "5px",
              borderRadius: "5px",
            }}
            style={{
              backgroundColor: theme.palette.error.main,
            }}
          >
            <BlockIcon
              sx={{
                width: "1.6rem",
                height: "1.6rem",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            />
          </IconButton>
        </Tooltip>
      </>
    );
  };

  useEffect(() => {
    const data = allEmployer.map((employer, i) =>
      EmployerTableConfig.getFormattedData(employer, i)
    );

    setRowData(data);
  }, [allEmployer]);

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          background: "#f8f8f8",
        }}
      >
        <EnhancedTableToolbar
          title="Employer"
          showAdd={false}
          btnTitle="ADD"
          tooltipTitle="Add Role"
          btnHandler={() => context.addEmployer()}
          circularLoader={
            isLoading && (
              <Spinner animation="border" style={{ margin: "10px" }} />
            )
          }
          refreshHandler={() => getAllData()}
          showSearch={true}
          filter={filter}
          refreshWhenWholeFilterChange={true}
          searchConfig={{
            searchKeys: ["collage_id", "collage_name"],
            filterValue: filter?.search?.keyword || "",
            setSearchConfig: (data) => {
              dispatch(actions.setFilter(data));
              dispatch(
                actions.setPageConfigData({ type: "SET_PAGE", data: 0 })
              );
            },
          }}
        />
        <TableCustomServer
          page={empPage}
          dataCount={empDataCount}
          dataPerPage={empDataPerPage}
          rowData={rowData}
          columnsConfig={EmployerTableConfig.columns}
          numCols={EmployerTableConfig.columns.length}
          showPagination={true}
          showViewButton={false}
          showDeleteButton={false}
          showExtraButton={true}
          renderExtraBtn={renderBtn}
          handleSetPage={(newPage) => {
            dispatch(
              actions.setPageConfigData({
                type: "SET_PAGE",
                data: newPage,
              })
            );
          }}
          handleNoOfRowsPerPage={(value) => {
            dispatch(
              actions.setPageConfigData({
                type: "SET_DATA_PER_PAGE",
                data: parseInt(value, 10),
              })
            );
            dispatch(actions.setPageConfigData({ type: "SET_PAGE", data: 0 }));
          }}
        />
      </Box>
    </>
  );
};

export default EmployerTable;
