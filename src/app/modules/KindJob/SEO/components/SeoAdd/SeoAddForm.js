import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import Select from "react-select";
import * as yup from "yup";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import { closeModal } from "../../../../Helpers/Dialog/closeModal";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  seo_id: yup.number(),
  page_slug_id: yup
    .string()
    .trim()
    .required("Page Slug is required"),
  keyword: yup
    .string()
    .trim()
    .required("Keyword is required"),
  description: yup
    .string()
    .trim()
    .required("Description is required"),
});

const init = {
  seo_id: 0,
  keyword: "",
  description: "",
  page_slug_id: "",
};

const SeoAddForm = ({ show, onHide, addSeo, pageSlug }) => {
  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          seo_id: values?.seo_id,
          page_slug_id: values?.page_slug_id?.value,
          keyword: values?.keyword,
          description: values?.description,
        };

        addSeo({ ...obj })
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
                SEO
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Keyword</Form.Label>
                    <Form.Control
                      type="text"
                      name="keyword"
                      value={values.keyword}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.keyword && errors.keyword}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.keyword}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>
                      Page Slug
                    </Form.Label>
                    <Select
                      isDisabled={isSubmitting}
                      options={pageSlug.map((v) => ({
                        label: v?.page_slug,
                        value: v?.page_slug_id,
                      }))}
                      menuPlacement="auto"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                      }}
                      value={values?.page_slug_id || []}
                      classNamePrefix="reactselect-select"
                      onChange={(data) => {
                        setFieldValue("page_slug_id", data || []);
                      }}
                      isSearchable={true}
                      isMulti={false}
                      placeholder="Select Page Slug"
                      noOptionsMessage={() => "No page slug Found"}
                      menuPortalTarget={document.querySelector("body")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.page_slug_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      name="description"
                      value={values.description}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
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

export default SeoAddForm;
