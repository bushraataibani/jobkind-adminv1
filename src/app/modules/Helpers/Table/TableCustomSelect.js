import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  styled,
} from "@mui/material";
import React from "react";
import noResult from "../../../../assets/noResut.svg";
import TablePaginationActions from "../TablePagination/TablePaginationActions";

const VisuallyHidden = styled("span")(({ theme }) => {
  return {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  };
});

const TableCustomSelect = ({
  rowData = [],
  selectedCheckbox = [],
  noDataMessage = "No Data Available",
  isnoDataSubText = true,
  noDataNavigateText,
  noDataDescription,
  navigateTo,
  setSelectedCheckbox = () => { },
  columnsConfig = [],
  showPagination = true,
  actions,
  page,
  dataCount,
  dataPerPage,
  numCols,
  secondColumnsConfig,
  sx,
  cssTableClassName,
  isBorderHeader = false,
  //-------------sorting--------------
  order = "asc",
  sortOrderBy = "updatedAt",
  handleRequestSort,
  clickActions,
  //-------------sorting--------------
  handleSetPage = () => { },
  handleNoOfRowsPerPage = () => { },
}) => {
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      return setSelectedCheckbox(rowData);
    }
    return setSelectedCheckbox([]);
  };
  const onSelectHandler = (event, selectedRowData) => {
    if (event.target.checked) {
      return setSelectedCheckbox([...selectedCheckbox, selectedRowData]);
    }
    return setSelectedCheckbox((prev) => {
      return prev.filter((data) => data.id.data !== selectedRowData.id.data);
    });
  };

  return (
    <>
      <TableContainer>
        <Table
          aria-label="collapsible table"
          stickyHeader={true}
          className={cssTableClassName}
        >
          <TableHead>
            <TableRow>
              <TableCell
                padding="checkbox"
                rowSpan={isBorderHeader ? 2 : null}
                sx={{
                  borderRight: isBorderHeader ? "1px solid #E0E0E0" : "none",
                }}
              >
                <Checkbox
                  color="success"
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 22 },
                  }}
                  indeterminate={
                    selectedCheckbox.length > 0 &&
                    selectedCheckbox.length !== rowData.length
                  }
                  checked={
                    selectedCheckbox.length > 0 &&
                    selectedCheckbox.length === rowData.length
                  }
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                  onClick={handleSelectAll}
                />
              </TableCell>
              {columnsConfig.map((c, i) => (
                <TableCell
                  key={i}
                  align={c.align}
                  rowSpan={c.rowSpan}
                  colSpan={c.colSpan}
                  style={{ ...c.styles }}
                  sx={{
                    fontSize: "1.2rem",
                    paddingTop: "10px",
                    paddingBottom: "10px",

                    borderRight: isBorderHeader ? "1px solid #E0E0E0" : "none",
                    ...c.styles,
                  }}
                  sortDirection={sortOrderBy === c.id ? order : false}
                >
                  {c.sort ? (
                    <TableSortLabel
                      active={sortOrderBy === c.id}
                      direction={sortOrderBy === c.id ? order : "asc"}
                      onClick={(e) =>
                        handleRequestSort(
                          c.id !== "patientName" ? c.id : "firstName",
                          sortOrderBy,
                          order
                        )
                      }
                    >
                      {c.label}
                      {sortOrderBy === c.id ? (
                        <VisuallyHidden>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </VisuallyHidden>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    <>{c.label}</>
                  )}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {columnsConfig?.map(
                (c) =>
                  secondColumnsConfig &&
                  c?.colSpan &&
                  secondColumnsConfig?.map((column) => (
                    <TableCell
                      key={column.label}
                      align={column.align}
                      rowSpan={column.rowSpan}
                      colSpan={column.colSpan}
                      style={{ ...column.styles }}
                      sx={{
                        top: 40,
                        fontSize: "1.2rem",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        borderRight: isBorderHeader
                          ? "1px solid #E0E0E0"
                          : "none",
                        borderTop: 0,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))
              )}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& > *:nth-of-type(even)": {
                backgroundColor: "#aaaaaa40",
              },
            }}
          >
            {rowData?.length > 0 ? (
              rowData.map((row, ii) => (
                <TableRow key={ii}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="success"
                      key={row.id.data}
                      id={row.id.data}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                      checked={selectedCheckbox.some(
                        (d) => d.id.data === row.id.data
                      )}
                      onChange={(e) => onSelectHandler(e, row)}
                      inputProps={{
                        "aria-label": "select desserts",
                      }}
                    />
                  </TableCell>
                  {Object.values(row).map(
                    (single, j) =>
                      single.display && (
                        <TableCell
                          style={{ ...single.styles }}
                          align={single.align}
                          key={j + "" + single.label}
                          size="small"
                          sx={{
                            fontSize: "1rem",
                          }}
                          rowSpan={single.rowSpan}
                          colSpan={single.colSpan}
                        >
                          {single.clickable ? (
                            <>
                              {
                                single?.click ? (
                                  <span
                                    style={{
                                      textDecoration: "underline",
                                      cursor: "pointer",
                                      fontWeight: 600,
                                    }}
                                    onClick={() => clickActions(row)}
                                  >
                                    {single.data}
                                  </span>
                                ) :
                                  <a href={single.linkUrl} target="blank">
                                    {single.data}
                                  </a>
                              }
                              {single.copyHandler}
                            </>
                          ) : (
                            single.data
                          )}
                        </TableCell>
                      )
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    columnsConfig.length +
                    1 +
                    (secondColumnsConfig ? secondColumnsConfig.length + 1 : 0)
                  }
                  style={{
                    fontSize: "1.1rem",
                    textAlign: "center",
                    height: "100px",
                    padding: "6px",
                  }}
                >
                  <Box
                    sx={{
                      border: "2px solid #444444",
                      borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                      height: "250px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 500,
                      color: "#444444",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "15px",
                        flexDirection: "column",
                      }}
                    >
                      <Box>
                        <img
                          src={noResult}
                          alt="noResult"
                          width="50"
                          height="50"
                        />
                      </Box>
                      <Box
                        sx={{
                          fontSize: "20px",
                          fontWeight: 600,
                          lineHeight: "12px",
                        }}
                      >
                        {noDataMessage ? noDataMessage : "No Data Available"}
                      </Box>

                      {isnoDataSubText && (
                        <Box
                          sx={{
                            fontSize: "16px",
                          }}
                        >
                          <span
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                            onClick={navigateTo}
                          >
                            {noDataNavigateText && noDataNavigateText}
                          </span>{" "}
                          {noDataDescription && noDataDescription}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer >
      {showPagination && (
        <table style={{ width: "100%" }}>
          <tfoot>
            <tr>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: "All", value: dataCount },
                ]}
                colSpan={numCols}
                count={dataCount}
                rowsPerPage={dataPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={(event, newPage) => {
                  handleSetPage(newPage);
                }}
                onRowsPerPageChange={(event) => {
                  const { value } = event.target;
                  handleNoOfRowsPerPage(value);
                }}
                ActionsComponent={TablePaginationActions}
              />
            </tr>
          </tfoot>
        </table>
      )
      }
    </>
  );
};

export default TableCustomSelect;
