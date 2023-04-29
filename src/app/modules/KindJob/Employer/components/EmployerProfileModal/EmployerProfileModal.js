import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import EmployerProfileModalTable from "./EmployerProfileModalTable";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";

const EmployerProfileModal = ({ show, onHide, id }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const { allEmpProfile } = useSelector(
    (state) => ({
      allEmpProfile: state.employer.allEmpProfile,
    }),
    shallowEqual
  );

  const [rowData, setRowData] = useState([]);

  const handleClose = () => {
    onHide();
    dispatch(actions.setAllEmpProfile({}));
  };

  let arr = allEmpProfile?.user_data && [
    {
      user_company_id: allEmpProfile?.user_data?.user_company.user_company_id,
      company_name: allEmpProfile?.user_data?.user_company.company_name,
      company_website_url:
        allEmpProfile?.user_data?.user_company.company_website_url,
      industries_id: allEmpProfile?.user_data?.user_company?.industries_id,
      no_of_employee: allEmpProfile?.user_data?.user_company?.no_of_employee,
      created_datetime:
        allEmpProfile?.user_data?.user_company?.created_datetime,
      updated_datetime:
        allEmpProfile?.user_data?.user_company?.updated_datetime,
    },
  ];

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
            Employer Profile
          </Box>
        </DialogCloseTitle>
        <DialogContent dividers>
          <EmployerProfileModalTable
            arr={arr}
            rowData={rowData}
            allEmpProfile={allEmpProfile}
            setRowData={setRowData}
            onHide={onHide}
          />
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

export default EmployerProfileModal;
