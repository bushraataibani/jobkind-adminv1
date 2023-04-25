import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import noPhoto from "../../../../../../assets/no-photo.webp";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustom from "../../../../Helpers/Table/TableCustom";
import { getCurrentDateTime } from "../../../../Utils/utils";
import EmployeeTableConfig from "../../EmployeeTableConfig";

const EmployeeProfileModal = ({
  showProfileModal,
  setShowProfileModal,
  allEmpProfile,
}) => {
  const [rowData, setRowData] = useState([]);
  const [experienceRowData, setExperienceRowData] = useState([]);
  // const [preferenceRowData, setPreferenceRowData] = useState([]);

  console.log(EmployeeTableConfig?.educationCol, "rowData");

  const handleClose = () => {
    setShowProfileModal(false);
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

  // useEffect(() => {
  //   const data = allEmpProfile?.user_preference_data?.map((preference, i) =>
  //     EmployeeTableConfig.getFormattedPreference(preference, i)
  //   );

  //   setPreferenceRowData(data);
  // }, [allEmpProfile]);

  return (
    <Form noValidate>
      <Dialog
        open={showProfileModal}
        scroll="paper"
        maxWidth="xl"
        fullWidth={true}
      >
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
            <Col sm={6} md={6}>
              <Row>
                <Col sm={3} md={3}>
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
                <Col sm={4} md={4}>
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
                  <Box>
                    <Box sx={{ fontWeight: 500 }}>DOB</Box>
                    <Box>
                      {getCurrentDateTime(
                        new Date(allEmpProfile?.user_data?.dob),
                        false,
                        false
                      )}
                    </Box>
                  </Box>
                </Col>
              </Row>
            </Col>
            <Col sm={6} md={6}>
              <Box
                sx={{
                  paddingBottom: "10px",
                }}
              >
                <Box sx={{ fontWeight: 500 }}>E-mail</Box>
                <Box>{allEmpProfile?.user_data?.email}</Box>
              </Box>
              <Box>
                <Box sx={{ fontWeight: 500 }}>Address</Box>
                <Box>{allEmpProfile?.user_data?.address}</Box>
              </Box>
            </Col>
          </Row>
          <Box sx={{ marginBottom: "20px" }}>
            <h4>Work Experience</h4>
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
            <h4>Education</h4>
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
          {/* <Box sx={{ marginBottom: "20px" }}>
            <h4>Preferences</h4>
            <TableCustom
              rowData={preferenceRowData !== undefined ? preferenceRowData : []}
              showViewButton={false}
              showDeleteButton={false}
              viewAction={false}
              deleteAction={false}
              columnsConfig={EmployeeTableConfig?.preferenceCol}
              numCols={EmployeeTableConfig?.preferenceCol?.length}
            />
          </Box> */}
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
