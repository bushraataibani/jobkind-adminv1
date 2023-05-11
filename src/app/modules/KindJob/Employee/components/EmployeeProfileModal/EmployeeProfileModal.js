import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import noPhoto from "../../../../../../assets/no-photo.webp";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustom from "../../../../Helpers/Table/TableCustom";
import { getCurrentDateTime } from "../../../../Utils/utils";
import { EmployeeSlice } from "../../../_redux/Employee/EmployeeSlice";
import EmployeeTableConfig from "../../EmployeeTableConfig";

const EmployeeProfileModal = ({ show, onHide, id }) => {
  const dispatch = useDispatch();
  const { actions } = EmployeeSlice;

  const { allEmpProfile } = useSelector(
    (state) => ({
      allEmpProfile: state.employee.allEmpProfile,
    }),
    shallowEqual
  );

  const [rowData, setRowData] = useState([]);
  const [experienceRowData, setExperienceRowData] = useState([]);

  const handleClose = () => {
    onHide();
    dispatch(actions.setAllEmpProfile({}));
  };

  useEffect(() => {
    const data = allEmpProfile?.user_education_data?.map((user, i) =>
      EmployeeTableConfig.getFormattedEducation(user, i)
    );

    setRowData(data);
  }, [allEmpProfile]);

  useEffect(() => {
    const data = allEmpProfile?.user_work_experiance_data?.map(
      (experience, i) =>
        EmployeeTableConfig.getFormattedExperience(experience, i)
    );

    setExperienceRowData(data);
  }, [allEmpProfile]);

  // const handleDownload1 = (file, employee) => {
  //   // Code to generate the file or get the file URL
  //   const fileUrl = file;

  //   // Create a temporary anchor element
  //   const link = document.createElement("a");
  //   link.href = fileUrl;
  //   link.download = `${allEmpProfile?.user_data?.first_name}
  //   ${allEmpProfile?.user_data?.last_name}-Resume ${moment().format(
  //     "MMM Do YY, h:mm:ss a"
  //   )}`;

  //   // Append the anchor element to the body
  //   document.body.appendChild(link);

  //   // Simulate a click on the anchor element
  //   link.click();

  //   // Remove the anchor element from the body
  //   document.body.removeChild(link);
  // };

  // const handleDownload = (file) => {
  //   try {
  //     let alink = document.createElement("a");
  //     alink.href = file;
  //     alink.download = `${allEmpProfile?.user_data?.first_name}
  //     ${allEmpProfile?.user_data?.last_name}-Resume ${moment().format(
  //       "MMM Do YY, h:mm:ss a"
  //     )}`;
  //     alink.click();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Form noValidate>
      <Dialog open={show} scroll="paper" maxWidth="xl" fullWidth={true}>
        <DialogCloseTitle onClose={() => handleClose()}>
          <Box
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Employee Profile
          </Box>
        </DialogCloseTitle>
        <DialogContent dividers>
          <Row
            style={{
              backgroundColor: "#f1f3f4",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <Col sm={12} md={12}>
              <Row>
                <Col sm={2} md={2}>
                  <img
                    src={allEmpProfile?.user_data?.profile_image || noPhoto}
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
                </Col>
                <Col sm={3} md={3}>
                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>Full Name</Box>
                    <Box>
                      {allEmpProfile?.user_data?.first_name}{" "}
                      {allEmpProfile?.user_data?.last_name}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>Gender</Box>
                    <Box>
                      {allEmpProfile?.user_data?.gender === 1
                        ? "Male"
                        : "Female"}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>DOB</Box>
                    <Box>
                      {getCurrentDateTime(
                        new Date(allEmpProfile?.user_data?.dob),
                        false,
                        false
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>E-mail</Box>
                    <Box>{allEmpProfile?.user_data?.email}</Box>
                  </Box>
                </Col>
                <Col sm={3} md={3}>
                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>Address</Box>
                    <Box>{allEmpProfile?.user_data?.address}</Box>
                  </Box>
                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>Skills</Box>
                    {allEmpProfile?.user_preference_data?.skills?.map(
                      (data, index) => (
                        <Box key={index}>- {data}</Box>
                      )
                    )}
                  </Box>
                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>English Speaking Level</Box>
                    <Box>
                      {
                        allEmpProfile?.user_preference_data
                          ?.english_speaking_level?.title
                      }
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ fontWeight: 500 }}>Languages</Box>
                    {allEmpProfile?.user_preference_data?.language?.map(
                      (data, index) => (
                        <Box key={index}>- {data}</Box>
                      )
                    )}
                  </Box>
                </Col>
                <Col sm={4} md={4}>
                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>Employment Type</Box>
                    {allEmpProfile?.user_preference_data?.preferred_employment_type?.map(
                      (data, index) => (
                        <Box key={index}>- {data}</Box>
                      )
                    )}
                  </Box>
                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>Work Place</Box>
                    {allEmpProfile?.user_preference_data?.preferred_work_place?.map(
                      (data, index) => (
                        <Box key={index}>- {data}</Box>
                      )
                    )}
                  </Box>
                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>Shift</Box>
                    {allEmpProfile?.user_preference_data?.preferred_shift?.map(
                      (data, index) => (
                        <Box key={index}>- {data}</Box>
                      )
                    )}
                  </Box>
                  {allEmpProfile?.user_preference_data?.resume_url !== null && (
                    <Box>
                      <Box sx={{ fontWeight: 500 }}>Resume</Box>
                      <Box>
                        {allEmpProfile?.user_preference_data?.resume_url}
                      </Box>
                      {/* <a
                        href={allEmpProfile?.user_preference_data?.resume_url}
                        download
                      >
                        Download
                      </a> */}
                      {/* <IconButton
                        onClick={() =>
                          downloadTxtFile(
                            allEmpProfile?.user_preference_data?.resume_url
                          )
                        }
                        variant="contained"
                        sx={{
                          padding: "5px",
                          borderRadius: "5px",
                          backgroundColor: "#17c191",

                          "&:hover": {
                            backgroundColor: "#17c191",
                          },
                          "& g": {
                            fill: "#fff",
                          },
                        }}
                      >
                        <FileDownloadIcon
                          sx={{
                            width: "1.6rem",
                            height: "1.6rem",
                          }}
                        />
                      </IconButton> */}
                    </Box>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Box sx={{ marginBottom: "20px" }}>
            <h4>Education</h4>
            <TableCustom
              rowData={rowData !== undefined ? rowData : []}
              showViewButton={false}
              showDeleteButton={false}
              viewAction={false}
              deleteAction={false}
              showPagination={false}
              columnsConfig={EmployeeTableConfig?.educationCol}
              numCols={EmployeeTableConfig?.educationCol?.length}
            />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <h4>Work Experience</h4>
            <TableCustom
              rowData={experienceRowData !== undefined ? experienceRowData : []}
              showViewButton={false}
              showDeleteButton={false}
              viewAction={false}
              deleteAction={false}
              showPagination={false}
              columnsConfig={EmployeeTableConfig?.experienceCol}
              numCols={EmployeeTableConfig?.experienceCol?.length}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Form>
  );
};

export default EmployeeProfileModal;
