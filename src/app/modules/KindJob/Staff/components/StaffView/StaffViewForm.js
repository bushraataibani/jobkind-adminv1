import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Formik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import Select from "react-select";
import * as yup from "yup";
import CustomSwitch from "../../../../Helpers/CustomSwitch/CustomSwitch";
import { closeModal } from "../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";
import { genderOptions } from "../StaffAdd/StaffAddForm";

const schema = yup.object({
  user_id: yup.number(),
  permission_profile_id: yup
    .number()
    .required("Permission Profile is required"),
  first_name: yup
    .string()
    .trim()
    .required("First Name is required"),
  last_name: yup
    .string()
    .trim()
    .required("Last Name is required"),
  gender: yup
    .string()
    .trim()
    .required("Gender is required"),
  dob: yup
    .string()
    .trim()
    .required("DOB is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email"),
  phone_number: yup
    .string()
    .trim()
    .matches(/^[0-9]+$/, "Please Enter valid contact number.")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Phone Number is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required"),
  address: yup
    .string()
    .trim()
    .required("Address is required"),
  profile_image: yup.string().trim(),
  status: yup.boolean(),
});

const StaffViewForm = ({
  show,
  onHide,
  saveStaff,
  selectedStaff,
  allProfilePermission,
}) => {
  const [isEditing, setIsEditing] = useState(true);
  const [showPass, setShowPass] = useState(false);

  const init = {
    user_id: parseInt(selectedStaff?.user_id?.data) || 0,
    permission_profile_id: selectedStaff?.permission_profile_id?.data,
    permission: selectedStaff?.permission_profile?.dataObj || [],
    first_name: selectedStaff?.first_name?.data || "",
    last_name: selectedStaff?.last_name?.data || "",
    gender: selectedStaff?.gender?.data === "Male" ? 1 : 2 || "",
    dob: selectedStaff?.dob?.data || new Date(),
    phone_number: selectedStaff?.phone_number?.data || "",
    email: selectedStaff?.email?.data || "",
    password: selectedStaff?.password?.data || "",
    address: selectedStaff?.address?.data || "",
    profile_image: "",
    status: selectedStaff?.is_active?.dataIs,
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          user_id: values?.user_id,
          permission_profile_id: values?.permission_profile_id,
          first_name: values?.first_name,
          last_name: values?.last_name,
          gender: parseInt(values?.gender),
          dob: moment(new Date(values?.dob)).format("YYYY-MM-DD"),
          email: values?.email,
          phone_number: values?.phone_number,
          password: values?.password,
          address: values?.address,
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
        <Form onSubmit={handleSubmit} noValidate>
          <Dialog open={show} scroll={"paper"} maxWidth="md" fullWidth={true}>
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
                <Col sm={12} md={12}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Permission Profile
                    </Form.Label>
                    <Select
                      isDisabled={isSubmitting || isEditing}
                      options={allProfilePermission.map((v) => ({
                        label: v?.title,
                        value: v?.permission_profile_id,
                      }))}
                      menuPlacement="auto"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                      }}
                      value={values?.permission || []}
                      classNamePrefix="reactselect-select"
                      onChange={(data) => {
                        setFieldValue(
                          "permission_profile_id",
                          data?.value || []
                        );
                        setFieldValue("permission", data || []);
                      }}
                      isSearchable={true}
                      placeholder="Select Permission"
                      noOptionsMessage={() => "No permission Found"}
                      menuPortalTarget={document.querySelector("body")}
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
                      as="select"
                      name="gender"
                      value={values.gender}
                      disabled={isSubmitting || isEditing}
                      onChange={handleChange}
                      isInvalid={errors.gender}
                    >
                      <option
                        value={""}
                        key={""}
                        style={{ fontStyle: "italic" }}
                      >
                        Select gender
                      </option>
                      {genderOptions?.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>DOB</Form.Label>
                    <DesktopDatePicker
                      inputFormat="MM/dd/yyyy"
                      value={values.dob || new Date()}
                      disabled={isSubmitting || isEditing}
                      onChange={(date) => {
                        setFieldValue("dob", date);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            width: "100%",
                            "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                              padding: "9.5px 14px",
                            },
                          }}
                        />
                      )}
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
                    <Form.Label style={{ fontWeight: 600 }}>
                      Password
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        autoComplete="password"
                        onBlur={handleBlur}
                        disabled={isSubmitting || isEditing}
                        isInvalid={touched.password && errors.password}
                      />

                      <InputGroup.Append>
                        <InputGroup.Text
                          onClick={() => setShowPass((prev) => !prev)}
                        >
                          <i
                            className={
                              showPass ? "fas fa-eye-slash" : "fas fa-eye"
                            }
                          ></i>
                        </InputGroup.Text>
                      </InputGroup.Append>

                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
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
                      disabled={isSubmitting || isEditing}
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
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default StaffViewForm;
