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
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";
import { default as AboutMe } from "./components/AboutMe/AboutMe";
import Address from "./components/Address/Address";
import Completed from "./components/Completed/Completed";
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
  allJob,
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
            allJob={allJob}
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
            setFieldValue={setFieldValue}
          />
        );
      default:
        return <Completed />;
    }
  }

  const handleSubmit = (values, resetForm) => {
    let obj = {
      user_id: 0,
      full_name: values?.full_name ? values?.full_name : "",
      email: values?.email ? values?.email : "",
      dob: values?.dob ? values?.dob : "",
      gender: values?.gender ? values?.gender : "",
      profile_image: values?.profile_image?.file
        ? values?.profile_image?.file
        : "",
      address: values?.address ? values?.address : "",
      state: values?.state?.value ? values?.state?.value : "",
      city: values?.city?.value ? values?.city?.value : "",
      education: {
        user_education_id: 0,
        education_id: values?.education_title?.education_id
          ? values?.education_title?.education_id
          : 0,
        education_title: values?.education_title?.title
          ? values?.education_title?.title
          : "",
        education_type: values?.education_type?.code
          ? values?.education_type?.code
          : 0,
        completion_expected_date: values?.completion_expected_date
          ? values?.completion_expected_date
          : "",
        degree_id: values?.degree_title?.value
          ? values?.degree_title?.value
          : 0,
        degree_title: values?.degree_title?.label
          ? values?.degree_title?.label
          : "",
        specialization_id: values?.specialization_title?.value
          ? values?.specialization_title?.value
          : 0,
        specialization_title: values?.specialization_title?.label
          ? values?.specialization_title?.label
          : "",
        collage_id: values?.collage_name?.value
          ? values?.collage_name?.value
          : 0,
        collage_name: values?.collage_name?.label
          ? values?.collage_name?.label
          : "",
      },
      experience: {
        user_workexperiance_id: 0,
        work_experience: values?.work_experience?.code
          ? values?.work_experience?.code
          : 0,
        total_year_experiance: values?.total_year_experiance
          ? values?.total_year_experiance
          : 0,
        total_month_experiance: values?.total_month_experiance
          ? values?.total_month_experiance
          : 0,
        job_title_id: values?.job_title_id?.value
          ? values?.job_title_id?.value
          : 0,
        job_title: values?.job_title?.label ? values?.job_title?.label : "",
        department_id: values?.department_name?.value
          ? values?.department_name?.value
          : 0,
        department_name: values?.department_name?.label
          ? values?.department_name?.label
          : "",
        company_name: values?.company_name ? values?.company_name : "",
        industry_id: values?.industry_name?.value
          ? values?.industry_name?.value
          : 0,
        industry_name: values?.industry_name?.label
          ? values?.industry_name?.label
          : "",
        start_date: values?.start_date ? values?.start_date : "",
        end_date: values?.end_date ? values?.end_date : "",
        is_working: values?.work_experience?.code === 1 ? true : false,
        current_salary: values?.current_salary ? values?.current_salary : 0,
        employment_type_id: values?.employment_type_id?.code
          ? values?.employment_type_id?.code
          : 0,
        notice_period_id: values?.notice_period_id?.code
          ? values?.notice_period_id?.code
          : 0,
        role_id: values?.role_name?.value ? values?.role_name?.value : 0,
        role_name: values?.role_name?.label ? values?.role_name?.label : "",
      },
      general: {
        user_preference_id: 0,
        skills:
          values?.skills?.length > 0
            ? values?.skills?.map((item) => item?.label)
            : [],
        skill_ids:
          values?.skills?.length > 0
            ? values?.skills?.map((item) => item?.value)
            : [],
        english_speaking_level_id: values?.english_speaking_level_id?.code
          ? values?.english_speaking_level_id?.code
          : 0,
        language_ids:
          values?.language_ids?.length > 0
            ? values?.language_ids
                ?.filter((item) => item?.selected === true)
                ?.map((item) => item?.language_id)
            : [],
        preferred_employment_type_id:
          values?.preferred_employment_type_id?.length > 0
            ? values?.preferred_employment_type_id
                ?.filter((item) => item?.selected === true)
                ?.map((item) => item?.code)
            : [],
        preferred_work_place_id:
          values?.preferred_work_place_id?.length > 0
            ? values?.preferred_work_place_id
                ?.filter((item) => item?.selected === true)
                ?.map((item) => item?.code)
            : [],
        preferred_shift_id:
          values?.preferred_shift_id?.length > 0
            ? values?.preferred_shift_id
                ?.filter((item) => item?.selected === true)
                ?.map((item) => item?.code)
            : [],
      },
      resume_url: values?.resume_url ? values?.resume_url : "",
    };

    addCandidateMgt(obj)
      .then((res) => {
        onHide();
        resetForm();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Formik validationSchema={schema} initialValues={init}>
      {({
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
                        (activeStep === 0 &&
                          (values?.fullName === "" ||
                            errors?.fullName ||
                            values?.email === "" ||
                            errors?.email ||
                            values?.gender === "" ||
                            errors?.gender))
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
              onClick={() => handleSubmit(values, resetForm)}
              // disabled={isSubmitting}
            />
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

export default EmployeeOfflineAddForm;
