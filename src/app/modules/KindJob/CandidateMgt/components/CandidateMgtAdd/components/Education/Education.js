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

const Education = ({
  values,
  handleBlur,
  isSubmitting,
  touched,
  handleChange,
  errors,
  setFieldValue,
  allDegree,
  allSpecialization,
  allCollege,
  allEducation,
}) => {
  const [eduoption, setEduOption] = useState(
    allEducation?.map((item) => ({
      title: item?.title,
      education_id: item?.education_id,
      selected: false,
    }))
  );
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState([]);
  const [eduTypeoption, setEduTypeOption] = useState([
    {
      name: "Full Time",
      code: 1,
      selected: false,
    },
    {
      name: "Part Time",
      code: 1,
      selected: false,
    },
    {
      name: "Correspondence",
      code: 1,
      selected: false,
    },
  ]);

  const handleEducationChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(eduoption));
    setEduOption(
      tempData?.map((data, index) => {
        return index === idx
          ? {
              title: data.title,
              education_id: data.education_id,
              selected: !data.selected,
            }
          : {
              title: data.title,
              education_id: data.education_id,
              selected: false,
            };
      })
    );

    setFieldValue("education", item);
  };

  const handleEduTypeChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(eduTypeoption));
    setEduTypeOption(
      tempData?.map((data, index) => {
        return index === idx
          ? { name: data.name, code: data.code, selected: !data.selected }
          : { name: data.name, code: data.code, selected: false };
      })
    );

    setFieldValue("educationType", item);
  };

  return (
    <>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>
              Your Highest Education
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
              {eduoption?.map((item, idx) => (
                <RadioGroup
                  key={idx}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={values?.education}
                  onChange={() => handleEducationChange(item, idx)}
                >
                  <FormControlLabel
                    control={<Radio />}
                    label={item?.title}
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
              {errors.education}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={12} md={4}>
          <Form.Group className="required">
            <Form.Label style={{ fontWeight: 600 }}>Degree</Form.Label>
            <Select
              isDisabled={isSubmitting}
              options={allDegree.map((v) => ({
                label: v?.title,
                value: v?.degree_id,
              }))}
              menuPlacement="auto"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 1301 }),
              }}
              value={selectedState || []}
              classNamePrefix="reactselect-select"
              onChange={(degree) => {
                setFieldValue("degree", degree);
                setSelectedState([degree]);
              }}
              isSearchable={true}
              placeholder="Select Degree"
              noOptionsMessage={() => "No Degree Found"}
              menuPortalTarget={document.querySelector("body")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.degree}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group className="required">
            <Form.Label style={{ fontWeight: 600 }}>Specialization</Form.Label>
            <Select
              isDisabled={isSubmitting}
              options={allSpecialization.map((v) => ({
                label: v?.title,
                value: v?.specialization_id,
              }))}
              menuPlacement="auto"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 1301 }),
              }}
              value={selectedCity || []}
              classNamePrefix="reactselect-select"
              onChange={(specialization) => {
                setFieldValue("specialization", specialization);
                setSelectedCity([specialization]);
              }}
              isSearchable={true}
              placeholder="Select Specialization"
              noOptionsMessage={() => "No Specialization Found"}
              menuPortalTarget={document.querySelector("body")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.specialization}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group className="required">
            <Form.Label style={{ fontWeight: 600 }}>College</Form.Label>
            <Select
              isDisabled={isSubmitting}
              options={allCollege.map((v) => ({
                label: v?.collage_name,
                value: v?.collage_id,
              }))}
              menuPlacement="auto"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 1301 }),
              }}
              value={selectedCollege || []}
              classNamePrefix="reactselect-select"
              onChange={(collegeName) => {
                setFieldValue("collegeName", collegeName);
                setSelectedCollege([collegeName]);
              }}
              isSearchable={true}
              placeholder="Select College"
              noOptionsMessage={() => "No College Found"}
              menuPortalTarget={document.querySelector("body")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.collegeName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>
              Choose Education Title
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
              {eduTypeoption?.map((item, idx) => (
                <RadioGroup
                  key={idx}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={values?.educationType}
                  onChange={() => handleEduTypeChange(item, idx)}
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
      </Form.Row>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>Completion Year</Form.Label>
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              disabled={isSubmitting}
              value={values.completionYear || new Date()}
              onChange={(date) => {
                setFieldValue("completionYear", date);
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
              {errors.completionYear}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
    </>
  );
};

export default Education;
