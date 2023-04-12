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
  state_id: yup.number(),
  state_name: yup
    .string()
    .trim()
    .required("State Name is required"),
  state_code: yup.string().trim(),
  is_active: yup.boolean(),
  country_id: yup.string().trim(),
});

const StateViewForm = ({
  show,
  onHide,
  saveState,
  selectedState,
  allCountry,
}) => {
  const [isEditing, setIsEditing] = useState(true);

  const init = {
    state_id: parseInt(selectedState?.state_id?.data) || 0,
    state_name: selectedState?.state_name?.data || "",
    state_code: selectedState?.state_code?.data || "",
    country_id: selectedState?.country_id?.data || "",
    is_active: selectedState?.is_active?.dataIs,
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          state_id: parseInt(values?.state_id),
          state_name: values?.state_name,
          state_code: values?.state_code,
          country_id: values?.country_id?.value,
          is_active: values?.is_active === true ? 1 : 0,
        };

        saveState({ ...obj })
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
                State
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      State Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="state_name"
                      value={values.state_name}
                      onBlur={handleBlur}
                      disabled={isSubmitting || isEditing}
                      isInvalid={touched.state_name && errors.state_name}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>
                      State Code
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="state_code"
                      value={values.state_code}
                      onBlur={handleBlur}
                      disabled={isSubmitting || isEditing}
                      isInvalid={touched.state_code && errors.state_code}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state_code}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>Country</Form.Label>
                    <Select
                      isDisabled={isSubmitting || isEditing}
                      options={allCountry.map((v) => ({
                        label: v?.country_name,
                        value: v?.country_id,
                      }))}
                      menuPlacement="auto"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                      }}
                      value={values?.country_id || []}
                      classNamePrefix="reactselect-select"
                      onChange={(data) => {
                        setFieldValue("country_id", data || []);
                      }}
                      isSearchable={true}
                      isMulti={false}
                      placeholder="Select Country"
                      noOptionsMessage={() => "No country Found"}
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

export default StateViewForm;
