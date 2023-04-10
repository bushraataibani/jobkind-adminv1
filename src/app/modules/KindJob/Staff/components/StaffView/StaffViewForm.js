import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import CustomSwitch from "../../../../Helpers/CustomSwitch/CustomSwitch";
import { closeModal } from "../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  staff_id: yup.number().required("Staff ID is required"),
  total_application: yup
    .string()
    .trim()
    .required("Total Application is required"),
  coins: yup
    .string()
    .trim()
    .required("Coins is required"),
  title: yup
    .string()
    .trim()
    .required("Title is required"),
  note: yup
    .string()
    .trim()
    .required("Note is required"),
  is_popular: yup.boolean(),
  is_active: yup.boolean(),
});

const StaffViewForm = ({ show, onHide, saveStaff, selectedStaff }) => {
  const [isEditing, setIsEditing] = useState(true);

  const init = {
    staff_id: parseInt(selectedStaff?.staff_id?.data) || 0,
    total_application: selectedStaff?.total_application?.data || "",
    coins: selectedStaff?.coins?.data || "",
    title: selectedStaff?.title?.data || "",
    note: selectedStaff?.note?.data || "",
    is_popular: selectedStaff?.is_popular?.dataIs,
    is_active: selectedStaff?.is_active?.dataIs,
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          staff_id: values?.staff_id,
          total_application: values?.total_application,
          coins: values?.coins,
          title: values?.title,
          note: values?.note,
          is_popular: values?.is_popular === true ? 1 : 0,
          is_active: values?.is_active === true ? 1 : 0,
        };

        saveStaff({ ...obj })
          .then(() => {
            closeModal({ setIsEditing, onHide, resetForm })();
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
        <Dialog open={show} scroll={"paper"} maxWidth="sm" fullWidth={true}>
          <Form onSubmit={handleSubmit} noValidate>
            <DialogCloseTitle
              onClose={closeModal({ onHide, resetForm })}
              isCloseButtonDisabled={isSubmitting}
            >
              <Box
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                Staff
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Staff ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="staff_id"
                      value={parseInt(values.staff_id)}
                      onChange={handleChange}
                      disabled={true}
                      onBlur={handleBlur}
                      isInvalid={touched.staff_id && errors.staff_id}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.staff_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Staff Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onBlur={handleBlur}
                      disabled={isSubmitting || isEditing}
                      isInvalid={touched.title && errors.title}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Total Application
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="total_application"
                      value={values.total_application}
                      onChange={handleChange}
                      disabled={isSubmitting || isEditing}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.total_application && errors.total_application
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.total_application}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Coins</Form.Label>
                    <Form.Control
                      type="number"
                      name="coins"
                      value={values.coins}
                      onBlur={handleBlur}
                      disabled={isSubmitting || isEditing}
                      isInvalid={touched.coins && errors.coins}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.coins}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      name="note"
                      value={values.note}
                      onChange={handleChange}
                      disabled={isSubmitting || isEditing}
                      onBlur={handleBlur}
                      isInvalid={touched.note && errors.note}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.note}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group>
                    <CustomSwitch
                      checked={values.is_popular}
                      onChange={(e) =>
                        setFieldValue("is_popular", e.target.checked)
                      }
                      onLabel="Popular"
                      offLabel="Unpopular"
                      switchOffStyles={{
                        backgroundColor: "rgb(216, 17, 17, 20%)",
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col sm={12} md={6}>
                  <Form.Group>
                    <CustomSwitch
                      checked={values.is_active}
                      onChange={(e) =>
                        setFieldValue("is_active", e.target.checked)
                      }
                      onLabel="Active"
                      offLabel="Inactive"
                      switchOffStyles={{
                        backgroundColor: "rgb(216, 17, 17, 20%)",
                      }}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
            </DialogContent>
            <DialogActions>
              <Button
                variant="secondary"
                onClick={closeModal({ onHide, resetForm })}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              {!isEditing ? (
                <BootstrapButton
                  variant="success"
                  type="submit"
                  label="Save"
                  labelWhenSubmitting="Saving"
                  isSubmitting={isSubmitting}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                />
              ) : (
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </Button>
              )}
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default StaffViewForm;
