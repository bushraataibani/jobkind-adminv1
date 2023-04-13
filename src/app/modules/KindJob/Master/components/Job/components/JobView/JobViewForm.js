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
  job_id: yup.number(),
  title: yup
    .string()
    .trim()
    .required("Title is required"),
  is_active: yup.boolean(),
});

const JobViewForm = ({ show, onHide, saveJob, selectedJob, allDepartment }) => {
  const [isEditing, setIsEditing] = useState(true);

  const init = {
    job_id: parseInt(selectedJob?.job_id?.data) || 0,
    title: selectedJob?.title?.data || "",
    is_active: selectedJob?.is_active?.dataIs,
    department: selectedJob?.job_departments?.dataObj,
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          job_id: values?.job_id,
          title: values?.title,
          is_active: values?.is_active === true ? 1 : 0,
          department: values?.department?.map((item) => ({
            job_department_id: item?.job_department_id,
            department_id: item?.value,
          })),
        };

        saveJob({ ...obj })
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
                Job
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Job Name
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
                <Col sm={12} md={12}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>
                      Department Role
                    </Form.Label>
                    <Select
                      isDisabled={isSubmitting || isEditing}
                      options={allDepartment.map((v) => ({
                        label: v?.department_name,
                        value: v?.department_id,
                        job_department_id: 0,
                      }))}
                      menuPlacement="auto"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                      }}
                      value={values?.department || []}
                      classNamePrefix="reactselect-select"
                      onChange={(data) => {
                        setFieldValue("department", data || []);
                      }}
                      isSearchable={true}
                      isMulti
                      placeholder="Select Department"
                      noOptionsMessage={() => "No department Found"}
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
                      disabled={isSubmitting || isEditing}
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

export default JobViewForm;
