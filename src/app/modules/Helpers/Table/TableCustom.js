import CancelIcon from "@mui/icons-material/Cancel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Autocomplete,
  Grid,
  IconButton,
  Input,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import noResult from "../../../../assets/noResut.svg";
import { cleanObject } from "../../Utils/utils";
import TablePaginationActions from "../TablePagination/TablePaginationActions";

export const columnSearchTypes = {
  TEXT: "text",
  NUMBER: "number",
  SELECT: "select",
  DATE_RANGE: "date-range",
};

export function descendingComparator(a, b, orderBy) {
  if (orderBy)
    if (orderBy === "updatedAt" || orderBy === "lastBeat") {
      if (b[orderBy]?.time < a[orderBy]?.time) {
        return -1;
      }
      if (b[orderBy]?.time > a[orderBy]?.time) {
        return 1;
      }
      return 0;
    } else if (orderBy === "online") {
      return a[orderBy]?.dataIs === b[orderBy]?.dataIs
        ? 0
        : a[orderBy]?.dataIs
        ? -1
        : 1;
    } else {
      if (
        b[orderBy]?.data?.toString()?.toUpperCase() <
        a[orderBy]?.data?.toString()?.toUpperCase()
      ) {
        return -1;
      }
      if (
        b[orderBy]?.data?.toString()?.toUpperCase() >
        a[orderBy]?.data?.toString()?.toUpperCase()
      ) {
        return 1;
      }
      if (b[orderBy]?.dataIs < a[orderBy]?.dataIs) {
        return -1;
      }
      if (b[orderBy]?.dataIs > a[orderBy]?.dataIs) {
        return 1;
      }

      return 0;
    }
  else return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const IconButtonStyle = styled(IconButton)(({ theme }) => {
  return {
    padding: "5px",
    borderRadius: "5px",
  };
});
const MoreVertIconStyle = styled(MoreVertIcon)(({ theme }) => {
  return {
    width: "1.6rem",
    height: "1.6rem",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  };
});
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

const CustomizedMenu = ({ row, moreIcons = () => {} }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const classes = useStyles2();
  const theme = useTheme();
  const icons = moreIcons(row).filter((d) => Boolean(d));
  const hasMoreThanOneIcon = icons.length > 0;

  return (
    hasMoreThanOneIcon && (
      <>
        <Tooltip disableInteractive={true} arrow title={"More Actions"}>
          <IconButtonStyle
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            style={{
              backgroundColor: theme.palette.info.main,
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIconStyle />
          </IconButtonStyle>
        </Tooltip>

        <Menu
          id="long-menu"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          elevation={0}
          PaperProps={{
            style: {
              border: "1px solid #aaa",
            },
          }}
          sx={{
            paddingRight: "0px !important",
          }}
          style={{
            paddingTop: "2px",
            paddingBottom: "2px",
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {icons}
        </Menu>
      </>
    )
  );
};

const GridColumnContainer = ({ gridItemComp, gridActionComp }) => (
  <Grid
    container
    spacing={1}
    alignItems="center"
    style={{ flexWrap: "nowrap" }}
  >
    <Grid item style={{ flex: 1, maxWidth: "160px", minWidth: "100px" }}>
      {gridItemComp}
    </Grid>

    {gridActionComp}
  </Grid>
);

const GridDeleteIconButton = ({ conditions = false, handleChangeValue }) =>
  conditions && (
    <Grid
      style={{ padding: 0, cursor: "pointer" }}
      item
      onClick={(e) => {
        e.stopPropagation();
        handleChangeValue("");
      }}
    >
      <CancelIcon color="error" />
    </Grid>
  );

const ColumnSearchRenderer = (
  column,
  columnSearchFieldData,
  setColumnSearchFieldData,
  rowData
) => {
  const handleChangeValue = (value) => {
    setColumnSearchFieldData((prev) => {
      const d = {
        ...prev,
        [column.id]: value,
      };
      return cleanObject(d);
    });
  };

  const fieldValue = columnSearchFieldData[column.id];
  switch (column.searchInputType) {
    case columnSearchTypes.SELECT:
      const options = rowData
        .map((data) => data[column.id].data)
        .filter((v, i, a) => a.indexOf(v) === i);
      return (
        <GridColumnContainer
          gridItemComp={
            <Autocomplete
              multiple
              options={options}
              getOptionLabel={(option) => option}
              value={fieldValue || []}
              onChange={(e, v) => {
                handleChangeValue(v);
              }}
              ChipProps={{
                size: "small",
              }}
              defaultValue={[]}
              disableClearable={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    !fieldValue
                      ? column.placeholder
                        ? column.placeholder
                        : "Select " + column.label
                      : ""
                  }
                  variant="standard"
                />
              )}
            />
          }
          gridActionComp={
            <GridDeleteIconButton
              conditions={fieldValue}
              handleChangeValue={handleChangeValue}
            />
          }
        />
      );

    default:
      return (
        <GridColumnContainer
          gridItemComp={
            <Input
              type={
                column.searchInputType
                  ? column.searchInputType
                  : columnSearchTypes.TEXT
              }
              value={fieldValue || ""}
              placeholder={
                column.placeholder
                  ? column.placeholder
                  : "Search " + column.label
              }
              inputProps={{
                style: {
                  textOverflow: "ellipsis",
                },
                min:
                  column.searchInputType === columnSearchTypes.NUMBER
                    ? 0
                    : undefined,
              }}
              onChange={(e) => {
                const { value } = e.target;
                if (column.searchInputType !== columnSearchTypes.NUMBER)
                  handleChangeValue(value);
                else if (
                  value === "" ||
                  (typeof +value === "number" && +value > 0)
                )
                  handleChangeValue(value);
              }}
            />
          }
          gridActionComp={
            <GridDeleteIconButton
              conditions={fieldValue}
              handleChangeValue={handleChangeValue}
            />
          }
        />
      );
  }
};

const TableCustom = ({
  deleteAction,
  deleteTooltip,
  isDisableDeleteButton = false,
  isDisableViewButton = false,
  viewTooltip,
  viewAction,
  showViewButton = true,
  ViewIcon = VisibilityIcon,
  showDeleteButton = true,
  showMoreButton = false,
  moreIcons = () => {},
  noDataMessage = "No Data Available",
  noDataMessageStyles = {},
  isnoDataSubText = true,
  noDataNavigateText,
  noDataDescription,
  navigateTo,
  rowData,
  allRowData,
  setRowData,
  extraButton,
  columnsConfig,
  secondColumnsConfig,
  numCols,
  extraBtnFirst,
  containerStyles = {},
  isBorderHeader = false,
  paginationTableStyles = {},
  showPagination = true,
  showColumnSearch = false,
  columnSearchFieldData,
  setColumnSearchFieldData,
  sortOrderBy = "updatedAt",
  search = "",
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(showPagination ? 10 : -1);

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState(sortOrderBy);

  const theme = useTheme();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const classes = useStyles2();

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rowData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (search !== "") {
      setPage(0);
    }
  }, [search]);

  return (
    <>
      <TableContainer style={{ ...containerStyles }}>
        <Table
          stickyHeader={true}
          sx={{
            minWidth: 500,
          }}
          aria-label="custom pagination table"
          size="small"
        >
          <TableHead>
            <TableRow>
              {columnsConfig.map((column) => (
                <TableCell
                  key={column.label}
                  align={column.align}
                  rowSpan={column.rowSpan}
                  colSpan={column.colSpan}
                  style={{ ...column.styles }}
                  sx={{
                    fontSize: "1.2rem",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    textTransform: "capitalize",
                  }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sort ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={(e) => handleRequestSort(e, column.id)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <VisuallyHidden>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </VisuallyHidden>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    <>{column.label}</>
                  )}
                </TableCell>
              ))}
            </TableRow>

            {secondColumnsConfig && (
              <TableRow>
                {secondColumnsConfig.map((column) => (
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
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {showColumnSearch && (
              <TableRow>
                {columnsConfig.map((column, i) =>
                  !column.isNotSearchable ? (
                    <TableCell
                      key={"search-" + column.id}
                      sx={{
                        fontSize: "1rem",
                        borderRight: isBorderHeader
                          ? "1px solid #E0E0E0"
                          : "none",
                      }}
                    >
                      {ColumnSearchRenderer(
                        column,
                        columnSearchFieldData,
                        setColumnSearchFieldData,
                        allRowData
                      )}
                    </TableCell>
                  ) : (
                    <TableCell
                      sx={{
                        fontSize: "1.2rem",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                      key={"search-" + i}
                    ></TableCell>
                  )
                )}
              </TableRow>
            )}

            {rowData?.length !== 0 ? (
              (rowsPerPage > 0
                ? stableSort(rowData, getComparator(order, orderBy)).slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : stableSort(rowData, getComparator(order, orderBy))
              ).map((row, i) => (
                <TableRow key={"row-" + row.id.data}>
                  {Object.values(row).map(
                    (single, j) =>
                      single.display && (
                        <TableCell
                          style={{ ...single.styles }}
                          align={single.align}
                          key={row.id.data + "" + single.label}
                          size="small"
                          sx={{
                            fontSize: "1rem",
                          }}
                          rowSpan={single.rowSpan}
                          colSpan={single.colSpan}
                        >
                          {single.clickable ? (
                            <>
                              <a href={single.linkUrl} target="blank">
                                {single.data}
                              </a>
                              {single.copyHandler}
                            </>
                          ) : (
                            single.data
                          )}
                        </TableCell>
                      )
                  )}

                  {!row.actions?.hide && (
                    <TableCell
                      style={{
                        width: 100,

                        // ...row.action?.styles,
                      }}
                      align="center"
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "4px",
                        }}
                      >
                        {extraBtnFirst && extraBtnFirst}

                        {showViewButton && (
                          <Tooltip
                            disableInteractive={true}
                            disableHoverListener={isDisableViewButton}
                            arrow
                            title={viewTooltip}
                          >
                            <span>
                              <IconButton
                                aria-label={viewTooltip}
                                onClick={() => viewAction(row)}
                                disabled={isDisableViewButton}
                                sx={{
                                  padding: "5px",
                                  borderRadius: "5px",
                                }}
                                style={{
                                  backgroundColor: theme.palette.secondary.main,
                                }}
                              >
                                <ViewIcon
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
                              </IconButton>{" "}
                            </span>
                          </Tooltip>
                        )}

                        {showDeleteButton && (
                          <Tooltip
                            disableInteractive={true}
                            disableHoverListener={isDisableDeleteButton}
                            arrow
                            title={deleteTooltip}
                          >
                            <span>
                              <IconButton
                                aria-label={deleteTooltip}
                                onClick={() => deleteAction(row)}
                                disabled={isDisableDeleteButton}
                                sx={{
                                  padding: "5px",
                                  borderRadius: "5px",
                                }}
                                style={{
                                  backgroundColor: theme.palette.error.main,
                                }}
                              >
                                <DeleteOutlineIcon
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
                              </IconButton>{" "}
                            </span>
                          </Tooltip>
                        )}

                        {extraButton && extraButton(row)}

                        {showMoreButton && (
                          <CustomizedMenu row={row} moreIcons={moreIcons} />
                        )}
                      </div>
                    </TableCell>
                  )}

                  {row.actions?.emptySpace && (
                    <TableCell
                      style={{ width: 60, ...row.action?.styles }}
                      align="center"
                    ></TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={numCols}
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
                      ...noDataMessageStyles,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "15px",
                        flexDirection: "column",
                        // padding: "20px"#444444,
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

            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>

      {showPagination && (
        <table style={{ ...paginationTableStyles }}>
          <tfoot>
            <tr>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: "All", value: rowData?.length },
                ]}
                // colSpan={numCols}
                count={rowData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
};

export default TableCustom;
