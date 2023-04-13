import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import CustomSwitch from "../../../../../../Helpers/CustomSwitch/CustomSwitch";
import { closeModal } from "../../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  country_id: yup.number(),
  country_name: yup
    .string()
    .trim()
    .required("Country Name is required"),
  country_code: yup.string().trim(),
  is_active: yup.boolean(),
});

const init = {
  country_id: 0,
  country_name: "",
  country_code: "",
  is_active: true,
};

const CountryAddForm = ({ show, onHide, addCountry }) => {
  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          country_id: values?.country_id,
          country_name: values?.country_name,
          country_code: values?.country_code,
          is_active: values?.is_active === true ? 1 : 0,
        };

        addCountry({ ...obj })
          .then(() => {
            closeModal({ onHide, resetForm })();
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
                Country
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Country Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="country_name"
                      value={values.country_name}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.country_name && errors.country_name}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.country_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>
                      Country Code
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="country_code"
                      value={values.country_code}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.country_code && errors.country_code}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.country_code}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12}>
                  <Form.Group>
                    <CustomSwitch
                      checked={values.is_active}
                      disabled={isSubmitting}
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

export default CountryAddForm;
