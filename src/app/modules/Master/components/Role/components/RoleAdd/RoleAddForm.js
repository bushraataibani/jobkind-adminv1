import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import CustomSwitch from "../../../../../Helpers/CustomSwitch/CustomSwitch";
import { closeModal } from "../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  role_id: yup.number().required("Role ID is required"),
  role_name: yup
    .string()
    .trim()
    .required("Role Name is required"),
  is_active: yup.boolean(),
});

const init = {
  role_id: 0,
  role_name: "",
  is_active: true,
};

const RoleAddForm = ({ show, onHide, addRole }) => {
  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          role_id: values?.role_id,
          role_name: values?.role_name,
          is_active: values?.is_active === true ? 1 : 0,
        };

        addRole({ ...obj })
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
                Role
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Role ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="role_id"
                      value={values.role_id}
                      onChange={handleChange}
                      disabled={true}
                      onBlur={handleBlur}
                      isInvalid={touched.role_id && errors.role_id}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.role_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                {" "}
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Role Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="role_name"
                      value={values.role_name}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.role_name && errors.role_name}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.role_name}
                    </Form.Control.Feedback>
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

export default RoleAddForm;
