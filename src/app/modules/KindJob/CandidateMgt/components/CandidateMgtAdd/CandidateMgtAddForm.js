import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import { closeModal } from "../../../../Helpers/Dialog/closeModal";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  candidateMgt_id: yup.number(),
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
  candidateMgt_id: 0,
  keyword: "",
  description: "",
  page_slug_id: "",
};

const CandidateMgtAddForm = ({ show, onHide, addCandidateMgt }) => {
  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          candidateMgt_id: values?.candidateMgt_id,
        };

        addCandidateMgt({ ...obj })
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
            <DialogContent dividers>hi</DialogContent>
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

export default CandidateMgtAddForm;
