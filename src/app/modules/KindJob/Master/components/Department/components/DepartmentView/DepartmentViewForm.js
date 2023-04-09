import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import Select from "react-select";
import CustomSwitch from "../../../../../../Helpers/CustomSwitch/CustomSwitch";
import { closeModal } from "../../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  department_id: yup.number().required("Department ID is required"),
  department_name: yup
    .string()
    .trim()
    .required("Department Name is required"),
  is_active: yup.boolean(),
});

const DepartmentViewForm = ({
  show,
  onHide,
  saveDepartment,
  selectedDepartment,
  allRole,
}) => {
  const [isEditing, setIsEditing] = useState(true);

  const init = {
    department_id: parseInt(selectedDepartment?.department_id?.data) || 0,
    department_name: selectedDepartment?.department_name?.data || "",
    is_active: selectedDepartment?.is_active?.dataIs,
    role: selectedDepartment?.department_role?.dataObj,
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          department_id: values?.department_id,
          department_name: values?.department_name,
          is_active: values?.is_active === true ? 1 : 0,
          role: values?.role?.map((item) => ({
            department_role_id: item?.department_role_id,
            role_id: item?.value,
          })),
        };

        saveDepartment({ ...obj })
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
                Department
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Department ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="department_id"
                      value={parseInt(values.department_id)}
                      onChange={handleChange}
                      disabled={true}
                      onBlur={handleBlur}
                      isInvalid={touched.department_id && errors.department_id}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.department_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Department Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="department_name"
                      value={values.department_name}
                      onBlur={handleBlur}
                      disabled={isSubmitting || isEditing}
                      isInvalid={
                        touched.department_name && errors.department_name
                      }
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.department_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>
                      Department Role
                    </Form.Label>
                    <Select
                      isDisabled={isSubmitting || isEditing}
                      options={allRole.map((v) => ({
                        label: v?.title,
                        value: v?.role_id,
                        department_role_id: 0,
                      }))}
                      menuPlacement="auto"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                      }}
                      value={values?.role || []}
                      classNamePrefix="reactselect-select"
                      onChange={(data) => {
                        setFieldValue("role", data || []);
                      }}
                      isSearchable={true}
                      isMulti
                      placeholder="Select Role"
                      noOptionsMessage={() => "No role Found"}
                      menuPortalTarget={document.querySelector("body")}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12}>
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
                  disabled={isSubmitting || isEditing}
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

export default DepartmentViewForm;
