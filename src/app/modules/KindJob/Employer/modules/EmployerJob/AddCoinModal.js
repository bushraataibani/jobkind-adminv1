import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { successMessage } from "../../../../Helpers/Alert/messages";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";
import {
  addCoin,
  getEmployerCoinHistory,
} from "../../../_redux/Employer/EmployerCrud";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";

const schema = yup.object({
  user_id: yup.number(),
  coin: yup.number(),
});

const AddCoinModal = ({ showAddModal, setShowAddModal, id }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedEmployer } = useSelector(
    (state) => ({
      selectedEmployer: state.employer.selectedEmployer,
    }),
    shallowEqual
  );

  const init = {
    user_id: selectedEmployer?.id?.data ? selectedEmployer?.id?.data : id,
    coin: "",
  };

  const handleClose = (resetForm) => {
    setShowAddModal(false);
    resetForm();
  };

  const addCoinToServer = (data) => {
    return addCoin(data).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Coin", "added"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getEmployerCoinHistory({
        search: "",
        page_no: 0,
        page_record: 10,
        user_id: parseInt(
          selectedEmployer?.id?.data ? selectedEmployer?.id?.data : id
        ),
      })
        .then((res) => {
          dispatch(
            actions.setEmpCoinHistory(res?.data?.data?.coin_transaction?.rows)
          );
        })
        .catch((error) => console.error(error))
        .finally(() => {
          dispatch(actions.setLoading(false));
        });
    });
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          user_id: values?.user_id,
          coin: values?.coin,
        };

        addCoinToServer({ ...obj })
          .then(() => {
            handleClose(resetForm);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        isValid,
        errors,
        touched,
        resetForm,
      }) => (
        <Dialog
          open={showAddModal}
          scroll={"paper"}
          maxWidth="sm"
          fullWidth={true}
        >
          <Form onSubmit={handleSubmit} noValidate>
            <DialogCloseTitle
              onClose={() => handleClose(resetForm)}
              isCloseButtonDisabled={isSubmitting}
            >
              <Box
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                Coin
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Coin</Form.Label>
                    <Form.Control
                      type="number"
                      name="coin"
                      value={values.coin}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.coin && errors.coin}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.coin}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>
            </DialogContent>
            <DialogActions>
              <Button
                variant="secondary"
                onClick={() => handleClose(resetForm)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <BootstrapButton
                variant="success"
                type="submit"
                label="Save"
                labelWhenSubmitting="Saving"
                isSubmitting={isSubmitting}
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default AddCoinModal;
