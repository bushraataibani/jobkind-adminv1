import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import noPhoto from "../../../../../../assets/no-photo.webp";
import TableCustom from "../../../../Helpers/Table/TableCustom";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import { EmployerContext } from "../../EmployerRoute";
import EmployerTableConfig from "../../EmployerTableConfig";
import AddCoinModal from "./AddCoinModal";

const EmployerJobViewTable = ({ show, onHide, id }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;
  const context = useContext(EmployerContext);

  const {
    allEmployerJob,
    allEmpProfile,
    empPage,
    empDataPerPage,
    empDataCount,
    empCoinHistory,
  } = useSelector(
    (state) => ({
      allEmployerJob: state.employer.allEmployerJob,
      allEmpProfile: state.employer.allEmpProfile,
      empPage: state.employer.empPage,
      empDataPerPage: state.employer.empDataPerPage,
      empDataCount: state.employer.empDataCount,
      empCoinHistory: state.employer.empCoinHistory,
    }),
    shallowEqual
  );

  const [rowData, setRowData] = useState([]);
  const [empCoinData, setEmpCoinData] = useState([]);
  const [showAddModal, setShowAddModal] = useState();

  useEffect(() => {
    const data = allEmployerJob?.map((job, i) =>
      EmployerTableConfig.getFormattedEmployerJob(job, i)
    );

    setRowData(data);
  }, [allEmployerJob]);

  useEffect(() => {
    const data = empCoinHistory?.map((job, i) =>
      EmployerTableConfig.getFormattedEmployerJobHistory(job, i)
    );

    setEmpCoinData(data);
  }, [empCoinHistory]);

  const handleJobListView = (row) => {
    dispatch(actions.employerFetched(row));
    context.employerJobApplyEmployee(
      parseInt(row?.user_id?.data),
      parseInt(row?.id?.data)
    );
  };

  const handleAddCoin = () => {
    setShowAddModal(true);
  };

  return (
    <>
      {show && (
        <>
          <Paper
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: "0px",
              overflow: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Col sm={9} md={9}>
                <h4 style={{ display: "flex", gap: "5px" }}>
                  <Box
                    onClick={() => onHide()}
                    sx={{
                      padding: "0px 10px",
                      fontSize: "1.4rem",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      className="fas fa-arrow-left"
                      style={{ color: "#000" }}
                    ></i>
                  </Box>
                  Employee Job List
                </h4>
                <TableCustom
                  page={empPage}
                  dataCount={empDataCount}
                  dataPerPage={empDataPerPage}
                  rowData={rowData !== undefined ? rowData : []}
                  columnsConfig={EmployerTableConfig?.employerJobColumns}
                  numCols={EmployerTableConfig?.employerJobColumns?.length}
                  showPagination={true}
                  showViewButton={true}
                  showDeleteButton={false}
                  viewAction={(row) => handleJobListView(row)}
                  deleteAction={false}
                  handleSetPage={(newPage) => {
                    dispatch(
                      actions.setEmpPageConfigData({
                        type: "SET_PAGE",
                        data: newPage,
                      })
                    );
                  }}
                  handleNoOfRowsPerPage={(value) => {
                    dispatch(
                      actions.setEmpPageConfigData({
                        type: "SET_DATA_PER_PAGE",
                        data: parseInt(value, 10),
                      })
                    );
                    dispatch(
                      actions.setEmpPageConfigData({
                        type: "SET_PAGE",
                        data: 0,
                      })
                    );
                  }}
                />
              </Col>

              <Col sm={3} md={3}>
                <React.Fragment>
                  {allEmpProfile && allEmpProfile?.user_data !== null && (
                    <>
                      <h4>Employee Info</h4>
                      <Box
                        sx={{
                          backgroundColor: "#f1f3f4",
                          padding: "10px",
                          marginBottom: "20px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <img
                            src={
                              allEmpProfile?.user_data?.profile_image || noPhoto
                            }
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = `${noPhoto}`;
                            }}
                            style={{
                              objectFit: "contain",
                              width: "auto",
                              height: "auto",
                              maxWidth: "100px",
                              maxHeight: "100px",
                            }}
                            alt="no_image"
                          />
                          <Box>
                            {(allEmpProfile.user_data?.first_name ||
                              allEmpProfile.user_data?.last_name) && (
                              <Box>
                                {allEmpProfile.user_data?.first_name || "-"}{" "}
                                {allEmpProfile.user_data?.last_name || "-"}
                              </Box>
                            )}
                            {allEmpProfile.user_data?.email && (
                              <Box>{allEmpProfile.user_data?.email}</Box>
                            )}
                            {allEmpProfile.user_data?.phone_number && (
                              <Box>{allEmpProfile.user_data?.phone_number}</Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                      {allEmpProfile.user_data?.user_company !== null && (
                        <>
                          <h4>Company Info</h4>
                          <Box
                            sx={{
                              backgroundColor: "#f1f3f4",
                              padding: "10px",
                              marginBottom: "20px",
                            }}
                          >
                            <Box>
                              {allEmpProfile.user_data?.user_company
                                ?.company_name && (
                                <Box>
                                  <strong>Name: </strong>
                                  {allEmpProfile.user_data?.user_company
                                    ?.company_name || "-"}
                                </Box>
                              )}
                              {allEmpProfile.user_data?.user_company
                                ?.industries_id && (
                                <Box>
                                  <strong>Industry: </strong>
                                  {allEmpProfile.user_data?.user_company
                                    ?.industries_id || "-"}
                                </Box>
                              )}
                              {allEmpProfile.user_data?.user_company
                                ?.company_website_url && (
                                <Box>
                                  <strong>Website: </strong>
                                  {allEmpProfile.user_data?.user_company
                                    ?.company_website_url || "-"}
                                </Box>
                              )}
                              {allEmpProfile.user_data?.user_company
                                ?.no_of_employee && (
                                <Box>
                                  <strong>No. of Employee: </strong>
                                  {allEmpProfile.user_data?.user_company
                                    ?.no_of_employee || "-"}
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </>
                      )}
                      {allEmpProfile.user_data?.user_client !== null && (
                        <>
                          <h4>Client Info</h4>
                          <Box
                            sx={{
                              backgroundColor: "#f1f3f4",
                              padding: "10px",
                            }}
                          >
                            <Box>
                              {allEmpProfile.user_data?.user_client
                                ?.client_firm_name && (
                                <Box>
                                  <strong>Firm Name: </strong>
                                  {allEmpProfile.user_data?.user_client
                                    ?.client_firm_name || "-"}
                                </Box>
                              )}
                              {allEmpProfile.user_data?.user_client
                                ?.consultancy_name && (
                                <Box>
                                  <strong>Consultancy Name: </strong>
                                  {allEmpProfile.user_data?.user_client
                                    ?.consultancy_name || "-"}
                                </Box>
                              )}
                              {allEmpProfile.user_data?.user_client
                                ?.consultancy_website_url && (
                                <Box>
                                  <strong>Website: </strong>
                                  {allEmpProfile.user_data?.user_client
                                    ?.consultancy_website_url || "-"}
                                </Box>
                              )}
                              {allEmpProfile.user_data?.user_client
                                ?.no_of_employee && (
                                <Box>
                                  <strong>No. of Employee: </strong>
                                  {allEmpProfile.user_data?.user_client
                                    ?.no_of_employee || "-"}
                                </Box>
                              )}
                              {allEmpProfile.user_data?.user_client
                                ?.number_of_hires && (
                                <Box>
                                  <strong>No. of Hires: </strong>
                                  {allEmpProfile.user_data?.user_client
                                    ?.number_of_hires || "-"}
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </>
                      )}
                    </>
                  )}

                  {empCoinHistory && empCoinHistory?.length > 0 && (
                    <div style={{ marginTop: "10px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h4>Coin History</h4>
                        <Tooltip
                          disableInteractive={true}
                          arrow
                          title="Add Coin"
                        >
                          <Button
                            size="large"
                            color="primary"
                            variant="contained"
                            style={{
                              color: "#fff",
                              marginLeft: "10px",
                              minWidth: "auto",
                            }}
                            onClick={() => handleAddCoin()}
                            startIcon={<AddIcon />}
                          >
                            Add
                          </Button>
                        </Tooltip>
                      </div>
                      <TableCustom
                        rowData={empCoinData !== undefined ? empCoinData : []}
                        columnsConfig={
                          EmployerTableConfig?.employerCoinHistoryColumns
                        }
                        numCols={
                          EmployerTableConfig?.employerCoinHistoryColumns
                            ?.length
                        }
                        showPagination={false}
                        showViewButton={false}
                        showDeleteButton={false}
                      />
                    </div>
                  )}
                  {showAddModal && (
                    <AddCoinModal
                      showAddModal={showAddModal}
                      setShowAddModal={setShowAddModal}
                      id={id}
                    />
                  )}
                </React.Fragment>
              </Col>
            </Box>
          </Paper>
        </>
      )}
    </>
  );
};

export default EmployerJobViewTable;
