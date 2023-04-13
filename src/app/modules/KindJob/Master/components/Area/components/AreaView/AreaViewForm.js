import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import CustomSwitch from "../../../../../../Helpers/CustomSwitch/CustomSwitch";
import { closeModal } from "../../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../../../Helpers/UI/Button/BootstrapButton";
import Select from "react-select";

const schema = yup.object({
  area_id: yup.number().required("Area ID is required"),
  area_name: yup
    .string()
    .trim()
    .required("Area Name is required"),
  is_active: yup.boolean(),
});

const AreaViewForm = ({ show, onHide, saveArea, selectedArea, allCity }) => {
  const [isEditing, setIsEditing] = useState(true);

  const init = {
    area_id: parseInt(selectedArea?.area_id?.data) || 0,
    area_name: selectedArea?.area_name?.data || "",
    city_id: selectedArea?.city_id?.data || "",
    is_active: selectedArea?.is_active?.dataIs,
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          area_id: parseInt(values?.area_id),
          area_name: values?.area_name,
          city_id: values?.city_id?.value,
          is_active: values?.is_active === true ? 1 : 0,
        };

        saveArea({ ...obj })
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
                Area
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Area ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="area_id"
                      value={parseInt(values.area_id)}
                      onChange={handleChange}
                      disabled={true}
                      onBlur={handleBlur}
                      isInvalid={touched.area_id && errors.area_id}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.area_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Area Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="area_name"
                      value={values.area_name}
                      onBlur={handleBlur}
                      disabled={isSubmitting || isEditing}
                      isInvalid={touched.area_name && errors.area_name}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.area_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>City ID</Form.Label>
                    <Select
                      isDisabled={isSubmitting || isEditing}
                      options={allCity.map((v) => ({
                        label: v?.city_name,
                        value: v?.city_id,
                      }))}
                      menuPlacement="auto"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                      }}
                      value={values?.city_id || []}
                      classNamePrefix="reactselect-select"
                      onChange={(data) => {
                        setFieldValue("city_id", data || []);
                      }}
                      isSearchable={true}
                      isMulti={false}
                      placeholder="Select City"
                      noOptionsMessage={() => "No city Found"}
                      menuPortalTarget={document.querySelector("body")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city_id}
                    </Form.Control.Feedback>
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

export default AreaViewForm;
