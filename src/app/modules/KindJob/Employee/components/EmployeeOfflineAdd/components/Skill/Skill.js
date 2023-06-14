import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import Select from "react-select";

const Skill = ({
  values,
  handleBlur,
  isSubmitting,
  touched,
  handleChange,
  errors,
  setFieldValue,
  allSkill,
  allLanguage,
}) => {
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [englishLevelOption, setEnglishLevelOption] = useState([
    {
      name: "No English",
      selected: false,
    },
    {
      name: "Basic",
      selected: false,
    },
    {
      name: "Intermediate",
      selected: false,
    },
    {
      name: "Advanced",
      selected: false,
    },
  ]);
  const [languageOption, setLanguageOption] = useState(
    allLanguage?.map((item) => ({ title: item.title, selected: false }))
  );
  const [prefferedEmpTypeOption, setPrefferedEmpTypeOption] = useState([
    {
      name: "Full Time",
      selected: false,
    },
    {
      name: "Part Time",
      selected: false,
    },
  ]);
  const [prefferedWorkPlaceOption, setPrefferedWorkPlaceOption] = useState([
    {
      name: "On-site",
      selected: false,
    },
    {
      name: "WFH",
      selected: false,
    },
  ]);
  const [prefferedShiftOption, setPrefferedShiftOption] = useState([
    {
      name: "Day",
      selected: false,
    },
    {
      name: "Night",
      selected: false,
    },
  ]);

  const handleEnglishLevelChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(englishLevelOption));

    setEnglishLevelOption(
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

    setFieldValue("english_level", item);
  };

  const handleLanguageChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(languageOption));
    tempData[idx].selected = !tempData[idx].selected;

    setLanguageOption(tempData);

    setFieldValue("language", tempData);
  };

  const handlePrefferedEmpTypeChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(prefferedEmpTypeOption));

    setPrefferedEmpTypeOption(
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

    setFieldValue("prefferedEmpType", item);
  };

  const handlePrefferedWorkPlaceChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(prefferedWorkPlaceOption));

    setPrefferedWorkPlaceOption(
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

    setFieldValue("prefferedWorkPlace", item);
  };

  const handlePrefferedShiftChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(prefferedShiftOption));

    setPrefferedShiftOption(
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

    setFieldValue("prefferedShift", item);
  };

  return (
    <>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group className="required">
            <Form.Label style={{ fontWeight: 600 }}>Inudstry</Form.Label>
            <Select
              isDisabled={isSubmitting}
              options={allSkill.map((v) => ({
                label: v?.title,
                value: v?.skill_id,
              }))}
              menuPlacement="auto"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 1301 }),
              }}
              value={selectedSkill || []}
              classNamePrefix="reactselect-select"
              onChange={(skill) => {
                setFieldValue("skill", skill);
                setSelectedSkill([skill]);
              }}
              isSearchable={true}
              placeholder="Select Skill"
              noOptionsMessage={() => "No Skill Found"}
              menuPortalTarget={document.querySelector("body")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.skill}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row
        style={{
          margin: "10px 0px",
        }}
      >
        <Form.Label style={{ fontWeight: 600 }}>Language</Form.Label>
      </Form.Row>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>
              Choose Your English Speaking Level
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
              {englishLevelOption?.map((item, idx) => (
                <RadioGroup
                  key={idx}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={values?.english_level}
                  onChange={() => handleEnglishLevelChange(item, idx)}
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
              {errors.english_level}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>
              Add Another Language You Can Speak
            </Form.Label>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "5px",
                marginLeft: "11px",
              }}
            >
              {languageOption?.map((item, idx) => (
                <RadioGroup
                  key={idx}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={values?.language}
                  onChange={() => handleLanguageChange(item, idx)}
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
              {errors.language}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={4} md={4}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>
              Preffered Employment Type
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
              {prefferedEmpTypeOption?.map((item, idx) => (
                <RadioGroup
                  key={idx}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={values?.prefferedEmpType}
                  onChange={() => handlePrefferedEmpTypeChange(item, idx)}
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
              {errors.prefferedEmpType}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={4} md={4}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>
              Preffered Work Place
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
              {prefferedWorkPlaceOption?.map((item, idx) => (
                <RadioGroup
                  key={idx}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={values?.prefferedWorkPlace}
                  onChange={() => handlePrefferedWorkPlaceChange(item, idx)}
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
              {errors.prefferedWorkPlace}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={4} md={4}>
          <Form.Group md="1" className="required">
            <Form.Label style={{ fontWeight: 600 }}>Preffered Shift</Form.Label>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "5px",
                marginLeft: "11px",
              }}
            >
              {prefferedShiftOption?.map((item, idx) => (
                <RadioGroup
                  key={idx}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={values?.prefferedShift}
                  onChange={() => handlePrefferedShiftChange(item, idx)}
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
              {errors.prefferedShift}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
    </>
  );
};

export default Skill;
