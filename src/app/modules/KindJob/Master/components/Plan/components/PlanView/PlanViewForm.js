import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import CustomSwitch from "../../../../../../Helpers/CustomSwitch/CustomSwitch";

import DialogCloseTitle from "../../../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../../../Helpers/UI/Button/BootstrapButton";
import PlanMetaViewForm from "./PlanMetaViewForm";

const schema = yup.object({
  plan_id: yup.number(),
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

const PlanViewForm = ({ show, onHide, savePlan, selectedPlan }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [planMetaDetails, setPlanMetaDetails] = useState(
    selectedPlan?.plan_metadata?.data?.map((item) => ({
      plan_meta_id: item?.plan_meta_id || 0,
      type: item?.type || "",
      title: item?.title || "",
    }))
  );

  const handleClose = (resetForm) => {
    onHide();
    resetForm();
    setPlanMetaDetails([
      {
        plan_meta_id: 0,
        type: "",
        title: "",
      },
    ]);
  };

  const init = {
    plan_id: parseInt(selectedPlan?.plan_id?.data) || 0,
    total_application: selectedPlan?.total_application?.data || "",
    coins: selectedPlan?.coins?.data || "",
    title: selectedPlan?.title?.data || "",
    note: selectedPlan?.note?.data || "",
    is_popular: selectedPlan?.is_popular?.dataIs,
    is_active: selectedPlan?.is_active?.dataIs,
    planMetaData: selectedPlan?.plan_metadata?.data,
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          plan_id: values?.plan_id,
          total_application: parseInt(values?.total_application),
          coins: parseInt(values?.coins),
          title: values?.title,
          note: values?.note,
          is_popular: values?.is_popular,
          is_active: values?.is_active === true ? 1 : 0,
          plan_meta: planMetaDetails?.length > 0 ? planMetaDetails : [],
        };

        savePlan({ ...obj })
          .then(() => {
            handleClose(resetForm);
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
              onClose={() => handleClose(resetForm)}
              isCloseButtonDisabled={isSubmitting}
            >
              <Box
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                Plan
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Plan Name
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
                      type="text"
                      name="total_application"
                      value={values.total_application}
                      onChange={(e) => {
                        const { value } = e.target;
                        if (/^[0-9]*$/gm.test(Number(value))) {
                          setFieldValue("total_application", value);
                        }
                      }}
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
                      type="text"
                      name="coins"
                      value={values.coins}
                      onBlur={handleBlur}
                      disabled={isSubmitting || isEditing}
                      isInvalid={touched.coins && errors.coins}
                      onChange={(e) => {
                        const { value } = e.target;
                        if (/^[0-9]*$/gm.test(Number(value))) {
                          setFieldValue("coins", value);
                        }
                      }}
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
                <Col sm={12} md={12}>
                  <Form.Group md="1">
                    <PlanMetaViewForm
                      planMetaDetails={planMetaDetails}
                      setPlanMetaDetails={setPlanMetaDetails}
                      isSubmitting={isSubmitting}
                      isEditing={isEditing}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group>
                    <FormControlLabel
                      value="is_popular"
                      sx={{
                        fontWeight: 600,
                        color: "#3f4254 !important",
                        flexDirection: "row",
                      }}
                      control={
                        <Checkbox
                          checked={values.is_popular}
                          disabled={isSubmitting || isEditing}
                          color="primary"
                          onChange={handleChange}
                          name="is_popular"
                        />
                      }
                      label="is_popular"
                    />
                  </Form.Group>
                </Col>

                <Col sm={12} md={6}>
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
                onClick={() => handleClose(resetForm)}
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

export default PlanViewForm;
