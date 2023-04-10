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
  user_id: yup.number().required("User ID is required"),
  permission_profile_id: yup
    .number()
    .required("Permission Profile ID is required"),
  gender: yup
    .string()
    .trim()
    .required("Gender is required"),
  first_name: yup
    .string()
    .trim()
    .required("First Name is required"),
  last_name: yup
    .string()
    .trim()
    .required("Last Name is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required"),
  dob: yup
    .string()
    .trim()
    .required("DOB is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required"),
  phone_number: yup
    .string()
    .trim()
    .required("Phone Number is required"),
  profile_image: yup
    .string()
    .trim()
    .required("Profile Image is required"),
  status: yup.boolean(),
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
          user_id: values?.user_id,
          permission_profile_id: values?.permission_profile_id,
          gender: values?.gender,
          first_name: values?.first_name,
          last_name: values?.last_name,
          email: values?.email,
          address: values?.address,
          dob: values?.dob,
          password: values?.password,
          phone_number: values?.phone_number,
          profile_image: "",
          status: values?.status === true ? 1 : 0,
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
                    <Form.Label style={{ fontWeight: 600 }}>User ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="user_id"
                      value={values.user_id}
                      onChange={handleChange}
                      disabled={true}
                      onBlur={handleBlur}
                      isInvalid={touched.user_id && errors.user_id}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.user_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Permission Profile ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="permission_profile_id"
                      value={values.permission_profile_id}
                      onChange={handleChange}
                      disabled={isSubmitting || isEditing}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.permission_profile_id &&
                        errors.permission_profile_id
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.permission_profile_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={values.first_name}
                      onChange={handleChange}
                      disabled={isSubmitting || isEditing}
                      onBlur={handleBlur}
                      isInvalid={touched.first_name && errors.first_name}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.first_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      disabled={isSubmitting || isEditing}
                      onBlur={handleBlur}
                      isInvalid={touched.last_name && errors.last_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.last_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      disabled={isSubmitting || isEditing}
                      onBlur={handleBlur}
                      isInvalid={touched.gender && errors.gender}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>DOB</Form.Label>
                    <Form.Control
                      type="text"
                      name="dob"
                      value={values.dob}
                      onChange={handleChange}
                      disabled={isSubmitting || isEditing}
                      onBlur={handleBlur}
                      isInvalid={touched.dob && errors.dob}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dob}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      disabled={isSubmitting || isEditing}
                      onBlur={handleBlur}
                      isInvalid={touched.email && errors.email}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="phone_number"
                      value={values.phone_number}
                      onChange={handleChange}
                      disabled={isSubmitting || isEditing}
                      onBlur={handleBlur}
                      isInvalid={touched.phone_number && errors.phone_number}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone_number}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      disabled={isSubmitting || isEditing}
                      onBlur={handleBlur}
                      isInvalid={touched.address && errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group>
                    <CustomSwitch
                      checked={values.status}
                      onChange={(e) =>
                        setFieldValue("status", e.target.checked)
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
