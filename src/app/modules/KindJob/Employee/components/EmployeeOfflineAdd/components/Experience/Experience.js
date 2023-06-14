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
    },
    {
      name: "No",
      selected: false,
    },
  ]);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [empTypeOption, setEmpTypeOption] = useState([
    {
      name: "Full Time",
      selected: false,
    },
    {
      name: "Part Time",
      selected: false,
    },
    {
      name: "Correspondence",
      selected: false,
    },
  ]);
  const [noticePeriodOption, setNoticePeriodOption] = useState([
    {
      name: "2 month",
      selected: false,
    },
    {
      name: "1 month",
      selected: false,
    },
  ]);

  const handleExperienceChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(experienceOption));
    setExperienceOption(
      tempData?.map((data, index) => {
        return index === idx
          ? {
              name: data.name,
              selected: !data.selected,
            }
          : {
              name: data.name,
              selected: false,
            };
      })
    );

    setFieldValue("isWorkExperience", item);
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

    setFieldValue("isWorkExperience", item);
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

    setFieldValue("isWorkExperience", item);
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
                  value={values?.isWorkExperience}
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
              {errors.isWorkExperience}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
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
              name="years"
              value={values.years}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.years && errors.years}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.years}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6} md={6}>
          <Form.Group className="required">
            <Form.Label style={{ fontWeight: 600 }}>Month</Form.Label>
            <Form.Control
              type="text"
              name="month"
              value={values.month}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.month && errors.month}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.month}
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
              name="jobTitle"
              value={values.jobTitle}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.jobTitle && errors.jobTitle}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.jobTitle}
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
                value: v?.degree_id,
              }))}
              menuPlacement="auto"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 1301 }),
              }}
              value={selectedIndustry || []}
              classNamePrefix="reactselect-select"
              onChange={(industry) => {
                setFieldValue("industry", industry);
                setSelectedIndustry([industry]);
              }}
              isSearchable={true}
              placeholder="Select Industry"
              noOptionsMessage={() => "No Industry Found"}
              menuPortalTarget={document.querySelector("body")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.industry}
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
                setFieldValue("department", department);
                setSelectedDepartment([department]);
              }}
              isSearchable={true}
              placeholder="Select Department"
              noOptionsMessage={() => "No Department Found"}
              menuPortalTarget={document.querySelector("body")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.department}
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
                value: v?.specialization_id,
              }))}
              menuPlacement="auto"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 1301 }),
              }}
              value={selectedRole || []}
              classNamePrefix="reactselect-select"
              onChange={(role) => {
                setFieldValue("role", role);
                setSelectedRole([role]);
              }}
              isSearchable={true}
              placeholder="Select Job Role"
              noOptionsMessage={() => "No Job Role Found"}
              menuPortalTarget={document.querySelector("body")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.role}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group className="required">
            <Form.Label style={{ fontWeight: 600 }}>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="companyName"
              value={values.companyName}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.companyName && errors.companyName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.companyName}
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
              value={values.startDate || new Date()}
              onChange={(date) => {
                setFieldValue("startDate", date);
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
              {errors.startDate}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>{" "}
        <Col sm={6} md={6}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>End Date</Form.Label>
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              disabled={isSubmitting}
              value={values.endDate || new Date()}
              onChange={(date) => {
                setFieldValue("endDate", date);
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
              {errors.endDate}
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
              name="salary"
              value={values.salary}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.salary && errors.salary}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.salary}
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
                  value={values?.educationType}
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
              {errors.educationType}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={12} md={6}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>Notice Period</Form.Label>
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
                  value={values?.noticePeriod}
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
              {errors.noticePeriod}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
    </>
  );
};

export default Experience;
