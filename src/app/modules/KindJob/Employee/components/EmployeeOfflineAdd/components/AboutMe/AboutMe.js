import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
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
import CustomPreview from "../../../../../../Helpers/CustomPreview/CustomPreview";
import DragDropFile from "../../../../../../Helpers/DragDropFile/DragDropFile";
import { changeHandlerImageImproved } from "../../../../../../Utils/utils";
import { addImageToServer } from "../../../../../_redux/Notification/NotificationCrud";

const AboutMe = ({
  values,
  handleBlur,
  isSubmitting,
  touched,
  handleChange,
  errors,
  setFieldValue,
}) => {
  const [isMediaType, setIsMediaType] = useState(true);
  let fileUploaded = [];

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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr",
          flexFlow: "row",
          gap: "10px",
        }}
        style={{ marginBottom: "10px" }}
      >
        <Form.Group style={{ gridRow: "span 2" }} className="required">
          <Form.Label style={{ fontWeight: 600 }}>Image</Form.Label>
          {values.profile_image.url && (
            <CustomPreview
              isSubmitting={isSubmitting}
              fileAccept="image/*"
              editTooltipText="Update Profile Picture"
              deleteTooltipText="Delete Profile Picture"
              deleteHandler={() =>
                setFieldValue("image", { file: null, url: "" })
              }
              editHandler={(e) =>
                changeHandlerImageImproved(e, ({ file, url }) => {
                  if (file?.type?.includes("image")) {
                    setIsMediaType(true);
                    setFieldValue("profile_image", { file, url });
                  } else {
                    setIsMediaType(false);
                  }
                })
              }
              styles={{
                rootStyles: {
                  width: "100%",
                  height: "100%",
                  maxHeight: "150px",
                },
                childrenStyles: {
                  width: "100%",
                  height: "100%",
                  maxHeight: "150px",
                },
              }}
            >
              <img
                src={values.profile_image.url}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  maxHeight: "150px",
                }}
                alt="NOIMAGE"
              />
            </CustomPreview>
          )}

          {!values.profile_image.url && (
            <div
              style={{
                height: "100%",
              }}
            >
              <DragDropFile
                Icon={AddAPhotoOutlinedIcon}
                showLabel={false}
                styles={{
                  rootStyles: {
                    flex: 1,
                    height: "150px",
                    maxHeight: "150px",
                  },
                }}
                label={"Drag & Drop Image Here..."}
                onChange={(event) => {
                  let formData = new FormData();
                  fileUploaded = event.target.files[0];
                  formData.append("file", fileUploaded);

                  changeHandlerImageImproved(event, ({ file, url }) => {
                    if (file?.type?.includes("image")) {
                      addImageToServer(formData)
                        .then((response) => {
                          setFieldValue("profile_image", {
                            file: response?.data?.data?.link,
                            url,
                          });
                        })
                        .catch((err) => {
                          console.log(err);
                        });

                      event.target.value = "";

                      setIsMediaType(true);
                    } else {
                      setIsMediaType(false);
                    }
                  });
                }}
                accept="image/*"
                isInvalid={Boolean(errors.profile_image?.file)}
              />

              <Form.Control.Feedback type="invalid">
                {isMediaType && errors.profile_image?.file}
              </Form.Control.Feedback>
            </div>
          )}
          {!isMediaType && (
            <span
              style={{
                fontSize: "0.9rem",
                color: "#dc3545",
              }}
            >
              Formats other than image are not accepted.
            </span>
          )}
        </Form.Group>
      </Box>
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
