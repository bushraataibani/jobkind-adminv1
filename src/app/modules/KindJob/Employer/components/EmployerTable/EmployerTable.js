import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BlockIcon from "@mui/icons-material/Block";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import { EmployerContext } from "../../EmployerRoute";
import EmployerTableConfig from "../../EmployerTableConfig";
import BlockEmployerModal from "../BlockEmployerModal/BlockEmployerModal";
import CoinHistory from "../CoinHistory/CoinHistory";

const EmployerTable = ({ allEmployer, getAllData }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { actions } = EmployerSlice;
  const context = useContext(EmployerContext);
  const [rowData, setRowData] = useState([]);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showCoinModal, setShowCoinModal] = useState(false);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.employer.isLoading,
      filter: state.employer.filter,
      page: state.employer.page,
      dataCount: state.employer.dataCount,
      dataPerPage: state.employer.dataPerPage,
    }),
    shallowEqual
  );

  const handleEmployerJobList = (row) => {
    dispatch(actions.employerFetched(row));
    context.employerJobList(row.id.data);
  };

  const handleBlock = (row) => {
    dispatch(actions.employerFetched(row));
    setShowBlockModal(true);
  };

  const handleCoinHistory = (row) => {
    dispatch(actions.employerFetched(row));
    setShowCoinModal(true);
  };

  const renderBtn = (row) => {
    return (
      <>
        <Tooltip
          disableInteractive={true}
          arrow
          title="Employer Coin History"
          placement="bottom"
        >
          <IconButton
            aria-label="Employer Coin History"
            onClick={() => handleCoinHistory(row)}
            sx={{
              padding: "5px",
              borderRadius: "5px",
            }}
            style={{
              backgroundColor: theme.palette.warning.main,
            }}
          >
            <CurrencyRupeeIcon
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
          title="Employer Profile"
          placement="bottom"
        >
          <IconButton
            aria-label="Employer Profile"
            onClick={() => handleEmployerJobList(row)}
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
          page={page}
          dataCount={dataCount}
          dataPerPage={dataPerPage}
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
      {showBlockModal && (
        <BlockEmployerModal
          showBlockModal={showBlockModal}
          setShowBlockModal={setShowBlockModal}
        />
      )}

      {showCoinModal && (
        <CoinHistory
          showCoinModal={showCoinModal}
          setShowCoinModal={setShowCoinModal}
        />
      )}
    </>
  );
};

export default EmployerTable;
