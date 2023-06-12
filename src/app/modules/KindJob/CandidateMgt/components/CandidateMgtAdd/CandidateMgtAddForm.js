import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import { closeModal } from "../../../../Helpers/Dialog/closeModal";
import { default as AboutMe } from "./components/AboutMe/AboutMe";
import Address from "./components/Address/Address";
import Education from "./components/Education/Education";
import Experience from "./components/Experience/Experience";
import Resume from "./components/Resume/Resume";
import Skill from "./components/Skill/Skill";

const steps = [
  "About me",
  "Address",
  "Education",
  "Experience",
  "Skill",
  "Resume",
];

const schema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email"),
  dob: yup
    .string()
    .trim()
    .required("DOB is required"),
  gender: yup
    .string()
    .trim()
    .required("Gender is required"),
});

const CandidateMgtAddForm = ({ show, onHide, addCandidateMgt }) => {
  const init = {
    fullName: "",
    email: "",
    dob: new Date(),
    gender: "",
  };

  const [activeStep, setActiveStep] = React.useState(0);
  let maxSteps = steps.length;

  const stepStyle = {
    "& .MuiStepIcon-root": {
      fontSize: "2.2rem",
    },

    "& .MuiStepIcon-text": {
      fontSize: "0.9rem",
    },
    "& .Mui-completed": {
      "&.MuiStepIcon-root": {
        color: "secondary.main",
        fontSize: "2.2rem",
      },
    },
  };

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  function renderActiveStepContent(
    step,
    values,
    handleBlur,
    isSubmitting,
    touched,
    handleChange,
    errors,
    setFieldValue
  ) {
    switch (step) {
      case 0:
        return (
          <AboutMe
            values={values}
            handleBlur={handleBlur}
            isSubmitting={isSubmitting}
            touched={touched}
            handleChange={handleChange}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        );
      case 1:
        return (
          <Address
            values={values}
            handleBlur={handleBlur}
            isSubmitting={isSubmitting}
            touched={touched}
            handleChange={handleChange}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        );
      case 2:
        return (
          <Education
            values={values}
            handleBlur={handleBlur}
            isSubmitting={isSubmitting}
            touched={touched}
            handleChange={handleChange}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        );
      case 3:
        return (
          <Experience
            values={values}
            handleBlur={handleBlur}
            isSubmitting={isSubmitting}
            touched={touched}
            handleChange={handleChange}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        );
      case 4:
        return (
          <Skill
            values={values}
            handleBlur={handleBlur}
            isSubmitting={isSubmitting}
            touched={touched}
            handleChange={handleChange}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        );
      case 5:
        return (
          <Resume
            values={values}
            handleBlur={handleBlur}
            isSubmitting={isSubmitting}
            touched={touched}
            handleChange={handleChange}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        );
      default:
        return <div>Not Found</div>;
    }
  }

  return (
    <Dialog open={show} scroll={"paper"} maxWidth="md" fullWidth={true}>
      <DialogCloseTitle onClose={closeModal({ onHide })}>
        <Box
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          Candidate Management
        </Box>
      </DialogCloseTitle>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
          <Formik
            validationSchema={schema}
            initialValues={init}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              console.log(values);
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
              <>
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  sx={stepStyle}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>
                        <div style={{ fontSize: "1.2rem" }}>{label}</div>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  <Box sx={{ marginTop: "25px" }}>
                    {renderActiveStepContent(
                      activeStep,
                      values,
                      handleBlur,
                      isSubmitting,
                      touched,
                      handleChange,
                      errors,
                      setFieldValue
                    )}
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={
                        activeStep === 0 ||
                        isSubmitting ||
                        values?.fullName === "" ||
                        errors?.fullName ||
                        values?.email === "" ||
                        errors?.email ||
                        values?.gender === "" ||
                        errors?.gender
                      }
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                      disabled={
                        activeStep === maxSteps - 1 ||
                        isSubmitting ||
                        values?.fullName === "" ||
                        errors?.fullName ||
                        values?.email === "" ||
                        errors?.email ||
                        values?.gender === "" ||
                        errors?.gender
                      }
                    >
                      Next
                    </Button>
                  </Box>
                </div>
              </>
            )}
          </Formik>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="secondary" onClick={closeModal({ onHide })}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CandidateMgtAddForm;
