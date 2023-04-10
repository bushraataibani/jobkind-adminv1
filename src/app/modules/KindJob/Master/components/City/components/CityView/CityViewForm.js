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
  city_id: yup.number().required("City ID is required"),
  city_name: yup
    .string()
    .trim()
    .required("Title is required"),
  is_active: yup.boolean(),
  state_id: yup.string().trim(),
  country_id: yup.string().trim(),
});

const CityViewForm = ({
  show,
  onHide,
  saveCity,
  selectedCity,
  allState,
  allCountry,
}) => {
  const [isEditing, setIsEditing] = useState(true);

  const init = {
    city_id: parseInt(selectedCity?.city_id?.data) || 0,
    city_name: selectedCity?.city_name?.data || "",
    is_active: selectedCity?.is_active?.dataIs,
    state_id: selectedCity?.state_id?.data,
    // country_id: "",
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          city_id: parseInt(values?.city_id),
          city_name: values?.city_name,
          is_active: values?.is_active === true ? 1 : 0,
          state_id: values?.state_id?.value,
        };

        saveCity({ ...obj })
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
                City
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>City ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="city_id"
                      value={parseInt(values.city_id)}
                      onChange={handleChange}
                      disabled={true}
                      onBlur={handleBlur}
                      isInvalid={touched.city_id && errors.city_id}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      City Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="city_name"
                      value={values.city_name}
                      onBlur={handleBlur}
                      disabled={isSubmitting || isEditing}
                      isInvalid={touched.city_name && errors.city_name}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>State</Form.Label>
                    <Select
                      isDisabled={isSubmitting || isEditing}
                      options={allState.map((v) => ({
                        label: v?.state_name,
                        value: v?.state_id,
                      }))}
                      menuPlacement="auto"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                      }}
                      value={values?.state_id || []}
                      classNamePrefix="reactselect-select"
                      onChange={(data) => {
                        setFieldValue("state_id", data || []);
                      }}
                      isSearchable={true}
                      isMulti={false}
                      placeholder="Select State"
                      noOptionsMessage={() => "No state Found"}
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

export default CityViewForm;
