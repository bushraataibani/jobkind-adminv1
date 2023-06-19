import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import Select from "react-select";

const Experience = ({
  values,
  handleBlur,
  isSubmitting,
  touched,
  handleChange,
  errors,
  setFieldValue,
  allIndustry,
  allDepartment,
  allRole,
}) => {
  const [experienceOption, setExperienceOption] = useState([
    {
      name: "Yes",
      selected: false,
      code: 1,
    },
    {
      name: "No",
      selected: false,
      code: 0,
    },
  ]);
  const [isExperience, setIsExperience] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [empTypeOption, setEmpTypeOption] = useState([
    {
      name: "Full Time",
      selected: false,
      code: 1,
    },
    {
      name: "Part Time",
      selected: false,
      code: 1,
    },
    {
      name: "Correspondence",
      selected: false,
      code: 1,
    },
  ]);
  const [noticePeriodOption, setNoticePeriodOption] = useState([
    {
      name: "2 month",
      selected: false,
      code: 1,
    },
    {
      name: "1 month",
      selected: false,
      code: 1,
    },
  ]);

  const handleExperienceChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(experienceOption));
    if (item?.name === "Yes") {
      setIsExperience(true);
    } else {
      setIsExperience(false);
    }
    setExperienceOption(
      tempData?.map((data, index) => {
        return index === idx
          ? {
              name: data.name,
              selected: !data.selected,
              code: data.code,
            }
          : {
              name: data.name,
              selected: false,
              code: data.code,
            };
      })
    );

    setFieldValue("work_experience", item);
  };

  const handleEmpTypeChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(empTypeOption));
    setEmpTypeOption(
      tempData?.map((data, index) => {
        return index === idx
          ? { name: data.name, code: data.code, selected: !data.selected }
          : { name: data.name, code: data.code, selected: false };
      })
    );

    setFieldValue("employment_type_id", item);
  };

  const handleNoticePeriodChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(noticePeriodOption));
    setNoticePeriodOption(
      tempData?.map((data, index) => {
        return index === idx
          ? { name: data.name, code: data.code, selected: !data.selected }
          : { name: data.name, code: data.code, selected: false };
      })
    );

    setFieldValue("notice_period_id", item);
  };

  return (
    <>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>
              Current Work Experience
            </Form.Label>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "5px",
                marginLeft: "11px",
              }}
            >
              {experienceOption?.map((item, idx) => (
                <RadioGroup
                  key={idx}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={values?.work_experience}
                  onChange={() => handleExperienceChange(item, idx)}
                >
                  <FormControlLabel
                    control={<Radio />}
                    label={item?.name}
                    sx={{
                      color: item?.selected
                        ? "#fff !important"
                        : "#3F4254 !important",
                      background: item?.selected ? "#242368d6" : "#eee",
                      padding: "5px 20px",
                      borderRadius: "20px",
                      "& .css-rahq8g-MuiButtonBase-root-MuiRadio-root": {
                        display: "none",
                      },
                    }}
                  />
                </RadioGroup>
              ))}
            </Box>
            <Form.Control.Feedback type="invalid">
              {errors.work_experience}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      {isExperience && (
        <>
          <Form.Row>
            <Form.Label style={{ fontWeight: 600 }}>
              Total Years of Experience
            </Form.Label>
          </Form.Row>
          <Form.Row>
            <Col sm={6} md={6}>
              <Form.Group className="required">
                <Form.Label style={{ fontWeight: 600 }}>Years</Form.Label>
                <Form.Control
                  type="text"
                  name="total_year_experiance"
                  value={values.total_year_experiance}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  isInvalid={
                    touched.total_year_experiance &&
                    errors.total_year_experiance
                  }
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.total_year_experiance}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6} md={6}>
              <Form.Group className="required">
                <Form.Label style={{ fontWeight: 600 }}>Month</Form.Label>
                <Form.Control
                  type="text"
                  name="total_month_experiance"
                  value={values.total_month_experiance}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  isInvalid={
                    touched.total_month_experiance &&
                    errors.total_month_experiance
                  }
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.total_month_experiance}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={12} md={12}>
              <Form.Group className="required">
                <Form.Label style={{ fontWeight: 600 }}>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="job_title"
                  value={values.job_title}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  isInvalid={touched.job_title && errors.job_title}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.job_title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={12} md={4}>
              <Form.Group className="required">
                <Form.Label style={{ fontWeight: 600 }}>Inudstry</Form.Label>
                <Select
                  isDisabled={isSubmitting}
                  options={allIndustry.map((v) => ({
                    label: v?.title,
                    value: v?.industries_id,
                  }))}
                  menuPlacement="auto"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                  }}
                  value={selectedIndustry || []}
                  classNamePrefix="reactselect-select"
                  onChange={(industry) => {
                    setFieldValue("industry_name", industry);
                    setSelectedIndustry([industry]);
                  }}
                  isSearchable={true}
                  placeholder="Select Industry"
                  noOptionsMessage={() => "No Industry Found"}
                  menuPortalTarget={document.querySelector("body")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.industry_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={12} md={4}>
              <Form.Group className="required">
                <Form.Label style={{ fontWeight: 600 }}>Department</Form.Label>
                <Select
                  isDisabled={isSubmitting}
                  options={allDepartment.map((v) => ({
                    label: v?.department_name,
                    value: v?.department_id,
                  }))}
                  menuPlacement="auto"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                  }}
                  value={selectedDepartment || []}
                  classNamePrefix="reactselect-select"
                  onChange={(department) => {
                    setFieldValue("department_name", department);
                    setSelectedDepartment([department]);
                  }}
                  isSearchable={true}
                  placeholder="Select Department"
                  noOptionsMessage={() => "No Department Found"}
                  menuPortalTarget={document.querySelector("body")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.department_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={12} md={4}>
              <Form.Group className="required">
                <Form.Label style={{ fontWeight: 600 }}>Job Role</Form.Label>
                <Select
                  isDisabled={isSubmitting}
                  options={allRole.map((v) => ({
                    label: v?.title,
                    value: v?.role_id,
                  }))}
                  menuPlacement="auto"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                  }}
                  value={selectedRole || []}
                  classNamePrefix="reactselect-select"
                  onChange={(role) => {
                    setFieldValue("role_name", role);
                    setSelectedRole([role]);
                  }}
                  isSearchable={true}
                  placeholder="Select Job Role"
                  noOptionsMessage={() => "No Job Role Found"}
                  menuPortalTarget={document.querySelector("body")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.role_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={12} md={12}>
              <Form.Group className="required">
                <Form.Label style={{ fontWeight: 600 }}>
                  Company Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="company_name"
                  value={values.company_name}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  isInvalid={touched.company_name && errors.company_name}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.company_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={6} md={6}>
              <Form.Group md="1" className="required">
                <Form.Label style={{ fontWeight: 600 }}>Start Date</Form.Label>
                <DesktopDatePicker
                  inputFormat="MM/dd/yyyy"
                  disabled={isSubmitting}
                  value={values.start_date || new Date()}
                  onChange={(date) => {
                    setFieldValue("start_date", date);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        width: "100%",
                        "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                          padding: "9.5px 14px",
                        },
                      }}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.start_date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>{" "}
            <Col sm={6} md={6}>
              <Form.Group md="1" className="required">
                <Form.Label style={{ fontWeight: 600 }}>End Date</Form.Label>
                <DesktopDatePicker
                  inputFormat="MM/dd/yyyy"
                  disabled={isSubmitting}
                  value={values.end_date || new Date()}
                  onChange={(date) => {
                    setFieldValue("end_date", date);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        width: "100%",
                        "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                          padding: "9.5px 14px",
                        },
                      }}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.end_date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={6} md={6}>
              <Form.Group className="required">
                <Form.Label style={{ fontWeight: 600 }}>
                  Current Monthly Salary
                </Form.Label>
                <Form.Control
                  type="text"
                  name="current_salary"
                  value={values.current_salary}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  isInvalid={touched.current_salary && errors.current_salary}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.current_salary}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={12} md={6}>
              <Form.Group md="1" className="required">
                <Form.Label style={{ fontWeight: 600 }}>
                  Choose Employment Type
                </Form.Label>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "5px",
                    marginLeft: "11px",
                  }}
                >
                  {empTypeOption?.map((item, idx) => (
                    <RadioGroup
                      key={idx}
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={values?.employment_type_id}
                      onChange={() => handleEmpTypeChange(item, idx)}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label={item?.name}
                        sx={{
                          color: item?.selected
                            ? "#fff !important"
                            : "#3F4254 !important",
                          background: item?.selected ? "#242368d6" : "#eee",
                          padding: "5px 20px",
                          borderRadius: "20px",
                          "& .css-rahq8g-MuiButtonBase-root-MuiRadio-root": {
                            display: "none",
                          },
                        }}
                      />
                    </RadioGroup>
                  ))}
                </Box>
                <Form.Control.Feedback type="invalid">
                  {errors.employment_type_id}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group md="1" className="required">
                <Form.Label style={{ fontWeight: 600 }}>
                  Notice Period
                </Form.Label>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "5px",
                    marginLeft: "11px",
                  }}
                >
                  {noticePeriodOption?.map((item, idx) => (
                    <RadioGroup
                      key={idx}
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={values?.notice_period_id}
                      onChange={() => handleNoticePeriodChange(item, idx)}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label={item?.name}
                        sx={{
                          color: item?.selected
                            ? "#fff !important"
                            : "#3F4254 !important",
                          background: item?.selected ? "#242368d6" : "#eee",
                          padding: "5px 20px",
                          borderRadius: "20px",
                          "& .css-rahq8g-MuiButtonBase-root-MuiRadio-root": {
                            display: "none",
                          },
                        }}
                      />
                    </RadioGroup>
                  ))}
                </Box>
                <Form.Control.Feedback type="invalid">
                  {errors.notice_period_id}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
        </>
      )}
    </>
  );
};

export default Experience;
