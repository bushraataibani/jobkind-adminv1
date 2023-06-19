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

const AboutMe = ({
  values,
  handleBlur,
  isSubmitting,
  touched,
  handleChange,
  errors,
  setFieldValue,
}) => {
  const genderOptions = [
    {
      name: "Male",
      code: 1,
      selected: false,
    },
    {
      name: "Female",
      code: 2,
      selected: false,
    },
  ];

  const [option, setOption] = useState(genderOptions);

  const handleGenderChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(option));
    setOption(
      tempData?.map((data, index) => {
        return index === idx
          ? { name: data.name, code: data.code, selected: !data.selected }
          : { name: data.name, code: data.code, selected: false };
      })
    );

    setFieldValue("gender", item?.code);
  };

  return (
    <>
      <Form.Row>
        <Col sm={6} md={6}>
          <Form.Group className="required">
            <Form.Label style={{ fontWeight: 600 }}>Full Name</Form.Label>
            <Form.Control
              autoFocus={true}
              type="text"
              name="full_name"
              value={values.full_name}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.full_name && errors.full_name}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.full_name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6} md={6}>
          <Form.Group className="required">
            <Form.Label style={{ fontWeight: 600 }}>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.email && errors.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>DOB</Form.Label>
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              disabled={isSubmitting}
              value={values.dob || new Date()}
              onChange={(date) => {
                setFieldValue("dob", date);
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
              {errors.dob}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>Gender</Form.Label>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "5px",
                marginLeft: "11px",
              }}
            >
              {option?.map((item, idx) => (
                <RadioGroup
                  key={idx}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={values?.gender}
                  onChange={() => handleGenderChange(item, idx)}
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
              {errors.gender}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
    </>
  );
};

export default AboutMe;
