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
      code: 1,
    },
    {
      name: "Basic",
      selected: false,
      code: 2,
    },
    {
      name: "Intermediate",
      selected: false,
      code: 3,
    },
    {
      name: "Advanced",
      selected: false,
      code: 4,
    },
  ]);
  const [languageOption, setLanguageOption] = useState(
    allLanguage?.map((item) => ({
      language_id: item.language_id,
      title: item.title,
      selected: false,
    }))
  );
  const [prefferedEmpTypeOption, setPrefferedEmpTypeOption] = useState([
    {
      name: "Full Time",
      selected: false,
      code: 1,
    },
    {
      name: "Part Time",
      selected: false,
      code: 2,
    },
  ]);
  const [prefferedWorkPlaceOption, setPrefferedWorkPlaceOption] = useState([
    {
      name: "Work from Field",
      selected: false,
      code: 1,
    },
    {
      name: "Work from Home",
      selected: false,
      code: 2,
    },
    {
      name: "Work from Office",
      selected: false,
      code: 3,
    },
  ]);
  const [prefferedShiftOption, setPrefferedShiftOption] = useState([
    {
      name: "Day Shift",
      selected: false,
      code: 1,
    },
    {
      name: "Night Shift",
      selected: false,
      code: 2,
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
              code: data.code,
            }
          : {
              name: data.name,
              selected: false,
              code: data.code,
            };
      })
    );

    setFieldValue("english_speaking_level_id", item);
  };

  const handleLanguageChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(languageOption));
    tempData[idx].selected = !tempData[idx].selected;

    setLanguageOption(tempData);

    setFieldValue("language_ids", tempData);
  };

  const handlePrefferedEmpTypeChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(prefferedEmpTypeOption));
    tempData[idx].selected = !tempData[idx].selected;

    setPrefferedEmpTypeOption(tempData);

    setFieldValue("preferred_employment_type_id", tempData);
  };

  const handlePrefferedWorkPlaceChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(prefferedWorkPlaceOption));
    tempData[idx].selected = !tempData[idx].selected;

    setPrefferedWorkPlaceOption(tempData);

    setFieldValue("preferred_work_place_id", tempData);
  };

  const handlePrefferedShiftChange = (item, idx) => {
    let tempData = JSON.parse(JSON.stringify(prefferedShiftOption));
    tempData[idx].selected = !tempData[idx].selected;

    setPrefferedShiftOption(tempData);

    setFieldValue("preferred_shift_id", tempData);
  };

  return (
    <>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group className="required">
            <Form.Label style={{ fontWeight: 600 }}>Skill</Form.Label>
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
                setFieldValue("skills", skill);
                setSelectedSkill(skill);
              }}
              isSearchable={true}
              isMulti={true}
              placeholder="Select Skill"
              noOptionsMessage={() => "No Skill Found"}
              menuPortalTarget={document.querySelector("body")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.skills}
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
          <Form.Group md="1">
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
                  value={values?.english_speaking_level_id}
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
              {errors.english_speaking_level_id}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group md="1">
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
                  value={values?.language_ids}
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
              {errors.language_ids}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={4} md={4}>
          <Form.Group md="1">
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
                  value={values?.preferred_employment_type_id}
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
              {errors.preferred_employment_type_id}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={4} md={4}>
          <Form.Group md="1">
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
                  value={values?.preferred_work_place_id}
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
              {errors.preferred_work_place_id}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={4} md={4}>
          <Form.Group md="1">
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
                  value={values?.preferred_shift_id}
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
              {errors.preferred_shift_id}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
    </>
  );
};

export default Skill;
