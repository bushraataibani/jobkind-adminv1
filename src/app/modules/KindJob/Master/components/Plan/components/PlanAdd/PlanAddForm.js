import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import CustomSwitch from "../../../../../../Helpers/CustomSwitch/CustomSwitch";
import { closeModal } from "../../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../../../Helpers/UI/Button/BootstrapButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const schema = yup.object({
  plan_id: yup.number().required("Plan ID is required"),
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

const init = {
  plan_id: 0,
  total_application: "",
  coins: "",
  title: "",
  note: "",
  is_popular: false,
  is_active: true,
};

const PlanAddForm = ({ show, onHide, addPlan }) => {
  const [planMetaDeleteData, setPlanMetaDeleteData] = useState("");
  const [planMetaDetails, setPlanMetaDetails] = useState([
    {
      plan_meta_id: 0,
      type: "",
      title: "",
    },
  ]);

  const typeOptions = [
    {
      name: "Coin",
      code: "Coin",
    },
    {
      name: "Verify",
      code: "Verify",
    },
    {
      name: "Time",
      code: "Time",
    },
  ];

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...planMetaDetails];
    list[index][name] = value.trimStart();
    setPlanMetaDetails(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...planMetaDetails];
    list.splice(index, 1);
    setPlanMetaDetails(list);
  };

  const handleAddClick = () => {
    setPlanMetaDetails([
      ...planMetaDetails,
      {
        plan_meta_id: 0,
        type: "",
        title: "",
      },
    ]);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          plan_id: values?.plan_id,
          total_application: values?.total_application,
          coins: values?.coins,
          title: values?.title,
          note: values?.note,
          is_popular: values?.is_popular === true ? 1 : 0,
          is_active: values?.is_active === true ? 1 : 0,
        };

        addPlan({ ...obj })
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
                Plan
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Plan ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="plan_id"
                      value={values.plan_id}
                      onChange={handleChange}
                      disabled={true}
                      onBlur={handleBlur}
                      isInvalid={touched.plan_id && errors.plan_id}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.plan_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Plan Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
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
                      type="number"
                      name="total_application"
                      value={values.total_application}
                      onChange={handleChange}
                      disabled={isSubmitting}
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
                      type="number"
                      name="coins"
                      value={values.coins}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.coins && errors.coins}
                      onChange={handleChange}
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
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      isInvalid={touched.note && errors.note}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.note}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              {planMetaDetails.map((item, index) => (
                <>
                  <Form.Row>
                    <Col sm={12} md={3}>
                      <Form.Group md="1" className="required">
                        <Form.Label style={{ fontWeight: 600 }}>
                          Plan Meta ID
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="plan_meta_id"
                          value={values.plan_meta_id}
                          onChange={handleChange}
                          disabled={true}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.plan_meta_id && errors.plan_meta_id
                          }
                          autoFocus
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.planplan_meta_id_id}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={3}>
                      <Form.Group className="required">
                        <Form.Label style={{ fontWeight: 600 }}>
                          Type
                        </Form.Label>

                        <Form.Control
                          as="select"
                          name="type"
                          value={values.type || ""}
                          onChange={(e) => handleInputChange(e, index)}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          isInvalid={touched.type && errors.type}
                        >
                          <option
                            value={""}
                            key={""}
                            style={{ fontStyle: "italic" }}
                          >
                            Select Baby gender
                          </option>
                          {typeOptions?.map((d) => (
                            <option key={d.code} value={d.code}>
                              {d.name}
                            </option>
                          ))}
                        </Form.Control>

                        <Form.Control.Feedback type="invalid">
                          {errors.type}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={3}>
                      <Form.Group className="required">
                        <Form.Label style={{ fontWeight: 600 }}>
                          Title
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="metaTitle"
                          value={values.metaTitle}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          isInvalid={touched.metaTitle && errors.metaTitle}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.metaTitle}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {planMetaDetails.length - 1 === index && (
                      <Col
                        sm={12}
                        md={1}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip
                          disableInteractive={true}
                          arrow
                          title={"Add Plan Meta Details"}
                          placement="bottom"
                        >
                          <IconButton
                            onClick={handleAddClick}
                            disabled={isSubmitting}
                          >
                            <AddCircleOutlineIcon
                              color="primary"
                              fontSize="large"
                              sx={{
                                width: "1.6rem",
                                height: "1.6rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Col>
                    )}
                    {planMetaDetails.length - 1 !== 0 && (
                      <Col
                        sm={12}
                        md={1}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip
                          disableInteractive={true}
                          arrow
                          title={"Remove Baby Details"}
                          placement="bottom"
                        >
                          <IconButton
                            onClick={() => {
                              setPlanMetaDeleteData(index);
                              // showDeleteModal(baby, baby?._id);
                            }}
                            disabled={isSubmitting}
                          >
                            <HighlightOffIcon
                              color="error"
                              fontSize="large"
                              sx={{
                                width: "1.6rem",
                                height: "1.6rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Col>
                    )}
                  </Form.Row>
                </>
              ))}

              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group>
                    <CustomSwitch
                      checked={values.is_popular}
                      onChange={(e) =>
                        setFieldValue("is_popular", e.target.checked)
                      }
                      onLabel="Popular"
                      offLabel="Unpopular"
                      switchOffStyles={{
                        backgroundColor: "rgb(216, 17, 17, 20%)",
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col sm={12} md={6}>
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

export default PlanAddForm;
