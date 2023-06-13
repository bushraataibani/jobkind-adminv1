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
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import { closeModal } from "../../../../Helpers/Dialog/closeModal";
import { getAllCity } from "../../../_redux/City/CityCrud";
import { getAllCollege } from "../../../_redux/College/CollegeCrud";
import { getAllDegree } from "../../../_redux/Degree/DegreeCrud";
import { getAllEducation } from "../../../_redux/Education/EducationCrud";
import { getAllSpecialization } from "../../../_redux/Specialization/SpecializationCrud";
import { getAllState } from "../../../_redux/State/StateCrud";
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
  city: yup
    .string()
    .trim()
    .required("City is required"),
  state: yup
    .string()
    .trim()
    .required("State is required"),
  education: yup
    .string()
    .trim()
    .required("Education is required"),
  degree: yup
    .string()
    .trim()
    .required("Degree is required"),
  specialization: yup
    .string()
    .trim()
    .required("Specialization is required"),
  collegeName: yup
    .string()
    .trim()
    .required("College is required"),
  educationType: yup
    .string()
    .trim()
    .required("Education Type is required"),
  completionYear: yup
    .string()
    .trim()
    .required("Completion Year is required"),
});

const CandidateMgtAddForm = ({ show, onHide, addCandidateMgt }) => {
  const init = {
    fullName: "",
    email: "",
    dob: new Date(),
    gender: "",
    city: "",
    state: "",
    education: "",
    degree: "",
    specialization: "",
    collegeName: "",
    educationType: "",
    completionYear: new Date(),
  };

  const [allCity, setAllCity] = useState([]);
  const [allState, setAllState] = useState([]);
  const [allDegree, setAllDegree] = useState([]);
  const [allSpecialization, setAllSpecialization] = useState([]);
  const [allCollege, setAllCollege] = useState([]);
  const [allEducation, setAllEducation] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  let maxSteps = steps.length;

  const getAllCitys = () => {
    getAllCity({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllCity(res?.data?.data?.city_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllStateList = () => {
    getAllState({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllState(res?.data?.data?.state_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllDegrees = () => {
    getAllDegree({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllDegree(res?.data?.data?.degrees_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllSpecializationList = () => {
    getAllSpecialization({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllSpecialization(res?.data?.data?.specializations_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };
  const getAllCollegeList = () => {
    getAllCollege({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllCollege(res?.data?.data?.collage_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllEducationList = () => {
    getAllEducation({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllEducation(res?.data?.data?.educations_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getAllCitys();
    getAllStateList();
    getAllDegrees();
    getAllSpecializationList();
    getAllCollegeList();
    getAllEducationList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
