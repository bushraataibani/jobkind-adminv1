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
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import { closeModal } from "../../../../Helpers/Dialog/closeModal";
import { default as AboutMe } from "./components/AboutMe/AboutMe";
import Address from "./components/Address/Address";
import Completed from "./components/Completed/Completed";
import Education from "./components/Education/Education";
import Experience from "./components/Experience/Experience";
import Resume from "./components/Resume/Resume";
import Skill from "./components/Skill/Skill";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";

const steps = [
  "About me",
  "Address",
  "Education",
  "Experience",
  "Skill",
  "Resume",
];

const EmployeeOfflineAddForm = ({
  show,
  onHide,
  addCandidateMgt,
  schema,
  init,
  allCity,
  allState,
  allDegree,
  allSpecialization,
  allCollege,
  allEducation,
  allIndustry,
  allDepartment,
  allRole,
  allSkill,
  allLanguage,
  setIsResumeSubmitting,
  isResumeSubmitting,
}) => {
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
            allCity={allCity}
            allState={allState}
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
            allDegree={allDegree}
            allSpecialization={allSpecialization}
            allCollege={allCollege}
            allEducation={allEducation}
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
            allIndustry={allIndustry}
            allDepartment={allDepartment}
            allRole={allRole}
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
            allSkill={allSkill}
            allLanguage={allLanguage}
          />
        );
      case 5:
        return (
          <Resume
            setIsResumeSubmitting={setIsResumeSubmitting}
            isResumeSubmitting={isResumeSubmitting}
          />
        );
      default:
        return <Completed />;
    }
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        console.log(values, "valuesss11111111");
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
        <Dialog open={show} scroll={"paper"} maxWidth="md" fullWidth={true}>
          {/* {console.log(values, "valuesss")} */}
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
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                      disabled={
                        isSubmitting ||
                        activeStep === maxSteps ||
                        isResumeSubmitting ||
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
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="secondary" onClick={closeModal({ onHide })}>
              Cancel
            </Button>
            <BootstrapButton
              variant="success"
              type="submit"
              label="Save"
              labelWhenSubmitting="Saving"
              // isSubmitting={isSubmitting}
              onClick={handleSubmit}
              // disabled={isSubmitting}
            />
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

export default EmployeeOfflineAddForm;
