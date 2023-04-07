import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  IconButton,
  TablePagination,
  TableSortLabel,
  Tooltip,
  Box,
  useTheme,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import TablePaginationActions from "../TablePagination/TablePaginationActions";
import noResult from "../../../../assets/noResut.svg";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 500,
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: "rect(0 0 0 0)",
//     height: 1,
//     margin: -1,
//     overflow: "hidden",
//     padding: 0,
//     position: "absolute",
//     top: 20,
//     width: 1,
//   },
//   tablebody: {
//     "& > *:nth-of-type(even)": {
//       backgroundColor: "#aaaaaa40",
//     },
//   },

//   cellHead: {
//     fontSize: "1.2rem",
//     paddingTop: "10px",
//     paddingBottom: "10px",
//   },
//   cellBody: {
//     fontSize: "1rem",
//   },
//   iconButton: {
//     padding: "5px",
//     borderRadius: "5px",
//   },
//   icon: {
//     width: "1.6rem",
//     height: "1.6rem",
//     fontSize: "1rem",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#fff",
//   },
//   ullist: {
//     paddingRight: "0px !important",
//   },
//   ul: {
//     justifyContent: "flex-end",
//   },
//   pagination: {
//     padding: "10px",
//   },
// });

const CustomizedMenu = ({ row, moreIcons = () => {} }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const classes = useStyles();
  const theme = useTheme();
  const icons = moreIcons(row).filter((d) => Boolean(d));
  const hasMoreThanOneIcon = icons.length > 0;

  return (
    hasMoreThanOneIcon && (
      <>
        <Tooltip disableInteractive={true} arrow title={"More Actions"}>
          <IconButton
            aria-label="more"
            sx={{
              padding: "5px",
              borderRadius: "5px",
            }}
            aria-controls="long-menu"
            aria-haspopup="true"
            style={{
              backgroundColor: theme.palette.info.main,
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon
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

const TableCustomServer = ({
  page,
  noDataOptionText,
  isnoDataSubText = true,
  noDataNavigateText,
  noDataDescription,
  navigateTo,
  deleteAction,
  deleteTooltip = "Delete",
  viewTooltip = "View",
  tooltipPlacement = "bottom",
  viewAction,
  dataCount,
  dataPerPage,
  showViewButton = true,
  showDeleteButton = true,
  showMoreButton = false,
  showExtraButton = false,
  moreIcons = () => {},
  rowData,
  columnsConfig,
  numCols,
  secondColumnsConfig,
  isBorderHeader = false,
  extraBtnFirst,
  containerStyles,
  showExtraButtonFirst = false,
  extraBtnFirstTooltip = "Add",
  showPagination = true,
  sortOrderBy = "updatedAt",
  handleRequestSort = () => {},
  renderExtraBrn = () => {},
  handleSetPage = () => {},
  handleNoOfRowsPerPage = () => {},
}) => {
  // const classes = useStyles();

  const theme = useTheme();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState(sortOrderBy);
  return (
    <>
      <TableContainer
        style={{
          ...containerStyles,
          background: "#fff",
          padding: "10px",
          borderRadius: "1.25rem",
        }}
      >
        <Table
          sx={{
            minWidth: 500,
          }}
          aria-label="custom pagination table"
          size="small"
          stickyHeader={true}
        >
          <TableHead>
            <TableRow>
              {columnsConfig?.map((column) => (
                <TableCell
                  key={column.label}
                  align={column.align}
                  rowSpan={column.rowSpan && isBorderHeader ? 2 : null}
                  colSpan={column.colSpan}
                  style={{ ...column.styles }}
                  sx={{
                    fontSize: "1.2rem",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    borderRight: isBorderHeader ? "1px solid #E0E0E0" : "none",
                  }}
                >
                  {column.sort ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={(e) => {
                        setOrderBy(column.id);
                        setOrder((prevState) =>
                          prevState === "desc" ? "asc" : "desc"
                        );
                        handleRequestSort(column.id, order);
                      }}
                    >
                      {column.tooltipText ? (
                        <Tooltip
                          disableInteractive={true}
                          arrow
                          title={column.tooltipText ?? ""}
                          placement={tooltipPlacement}
                        >
                          <Box sx={{ width: "max-content" }}>
                            {column.label}
                          </Box>
                        </Tooltip>
                      ) : (
                        <Box sx={{ width: "max-content" }}> {column.label}</Box>
                      )}
                    </TableSortLabel>
                  ) : column.tooltipText ? (
                    <Tooltip
                      disableInteractive={true}
                      arrow
                      title={column.tooltipText ?? ""}
                      placement={tooltipPlacement}
                    >
                      <Box sx={{ width: "max-content" }}> {column.label}</Box>
                    </Tooltip>
                  ) : (
                    <Box sx={{ width: "max-content" }}> {column.label}</Box>
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
          <TableBody
          // sx={{
          //   "& > *:nth-of-type(even)": {
          //     backgroundColor: "#aaaaaa40",
          //   },
          // }}
          >
            {rowData?.length !== 0 ? (
              rowData?.map((row, i) => (
                <TableRow key={row.id.data}>
                  {Object.values(row).map(
                    (single, j) =>
                      single.display && (
                        <TableCell
                          style={{ ...single.styles }}
                          align={single.align}
                          key={row.data + "" + single.label}
                          size="small"
                          sx={{
                            fontSize: "1rem",
                            // "& > *:nth-of-type(even)": {
                            //   backgroundColor: "#aaaaaa40",
                            // },
                          }}
                          rowSpan={single.rowSpan}
                          colSpan={single.colSpan}
                        >
                          {single.clickable ? (
                            <a href={single.data} target="blank">
                              {single.data}
                            </a>
                          ) : single.data ? (
                            single.data
                          ) : (
                            single.toDisplayIfNoData || ""
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
                        {showExtraButtonFirst && extraBtnFirst && (
                          <Tooltip
                            disableInteractive={true}
                            arrow
                            title={extraBtnFirstTooltip}
                            placement={tooltipPlacement}
                          >
                            {extraBtnFirst(row)}
                          </Tooltip>
                        )}

                        {showViewButton && (
                          <Tooltip
                            disableInteractive={true}
                            arrow
                            title={viewTooltip}
                            placement={tooltipPlacement}
                          >
                            <IconButton
                              aria-label={viewTooltip}
                              onClick={() => viewAction(row)}
                              sx={{
                                padding: "5px",
                                borderRadius: "5px",
                              }}
                              style={{
                                backgroundColor: theme.palette.secondary.main,
                              }}
                            >
                              <VisibilityIcon
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
                        )}

                        {showDeleteButton && (
                          <Tooltip
                            disableInteractive={true}
                            arrow
                            title={deleteTooltip}
                            placement={tooltipPlacement}
                          >
                            <IconButton
                              aria-label={deleteTooltip}
                              onClick={() => deleteAction(row)}
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
                            </IconButton>
                          </Tooltip>
                        )}

                        {showExtraButton && renderExtraBrn(row)}
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
              // <TableRow>
              //   <TableCell
              //     colSpan={numCols}
              //     style={{
              //       fontSize: "1.1rem",
              //       textAlign: "center",
              //       height: "100px",
              //       padding: "6px",
              //     }}
              //   >
              //     <div
              //       style={{
              //         border: "2px solid " + theme.palette.error.main,
              //         borderRadius: `${theme.shape.borderRadius}px`,
              //         height: "100%",
              //         display: "flex",
              //         alignItems: "center",
              //         justifyContent: "center",
              //         fontWeight: 500,
              //         color: theme.palette.error.main,
              //       }}
              //     >
              //       {noDataOptionText ? noDataOptionText : "No Data Available"}
              //     </div>
              //   </TableCell>
              // </TableRow>
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
                        {noDataOptionText
                          ? noDataOptionText
                          : "No Data Available"}
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
          {/* {showPagination && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={numCols}
                count={dataCount}
                rowsPerPage={dataPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={(event, newPage) => {
                  dispatch(
                    actions.setPageConfigData({
                      type: "SET_PAGE",
                      data: newPage,
                    })
                  );
                  // setPage(newPage);
                }}
                onRowsPerPageChange={(event) => {
                  dispatch(
                    actions.setPageConfigData({
                      type: "SET_DATA_PER_PAGE",
                      data: parseInt(event.target.value, 10),
                    })
                  );
                  dispatch(
                    actions.setPageConfigData({ type: "SET_PAGE", data: 0 })
                  );
                }}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        )} */}
        </Table>
      </TableContainer>

      {showPagination && (
        <table style={{ width: "100%" }}>
          <tfoot>
            <tr>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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
                  // setPage(newPage);
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
      )}

      {console.log(page, dataPerPage)}
    </>
  );
};

export default TableCustomServer;
