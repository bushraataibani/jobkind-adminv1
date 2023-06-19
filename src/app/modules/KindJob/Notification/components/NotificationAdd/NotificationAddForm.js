import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import Select from "react-select";
import * as yup from "yup";
import CustomPreview from "../../../../Helpers/CustomPreview/CustomPreview";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import { closeModal } from "../../../../Helpers/Dialog/closeModal";
import DragDropFile from "../../../../Helpers/DragDropFile/DragDropFile";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";
import { changeHandlerImageImproved } from "../../../../Utils/utils";
import { addImageToServer } from "../../../_redux/Notification/NotificationCrud";

const schema = yup.object({
  message: yup
    .string()
    .trim()
    .required("Message is required"),
  user_ids: yup
    .string()
    .trim()
    .required("User is required"),
  image: yup.object({
    file: yup.mixed(),
    url: yup.string(),
  }),
});

const init = {
  message: "",
  user_ids: "",
  image: {
    file: null,
    url: "",
  },
};

const NotificationAddForm = ({ show, onHide, addNotification, allUser }) => {
  const [isMediaType, setIsMediaType] = useState(true);
  let fileUploaded = [];

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          image: values?.image?.file,
          message: values?.message,
          user_ids: values.user_ids?.map((item) => item?.value),
        };

        addNotification({ ...obj })
          .then(() => {
            closeModal({ onHide, resetForm })();
          })
          .finally(() => {
            setSubmitting(false);
          });
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
        <Dialog open={show} scroll={"paper"} maxWidth="sm" fullWidth={true}>
          <Form onSubmit={handleSubmit} noValidate>
            <DialogCloseTitle
              onClose={closeModal({ onHide, resetForm })}
              isCloseButtonDisabled={isSubmitting}
            >
              <Box
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                Notification
              </Box>
            </DialogCloseTitle>

            <DialogContent dividers>
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
                  {values.image.url && (
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
                            setFieldValue("image", { file, url });
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
                        src={values.image.url}
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

                  {!values.image.url && (
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
                                  setFieldValue("image", {
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
                        isInvalid={Boolean(errors.image?.file)}
                      />

                      <Form.Control.Feedback type="invalid">
                        {isMediaType && errors.image?.file}
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
                <Col sm={12} md={12}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      name="message"
                      value={values.message}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.message && errors.message}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>User</Form.Label>
                    <Select
                      isDisabled={isSubmitting}
                      options={allUser.map((v) => ({
                        label: v?.first_name,
                        value: v?.user_id,
                      }))}
                      menuPlacement="auto"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                      }}
                      value={values?.user_ids || []}
                      classNamePrefix="reactselect-select"
                      onChange={(data) => {
                        setFieldValue("user_ids", data || []);
                      }}
                      isSearchable={true}
                      isMulti={true}
                      placeholder="Select User"
                      noOptionsMessage={() => "No user Found"}
                      menuPortalTarget={document.querySelector("body")}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
            </DialogContent>
            <DialogActions>
              <Button
                variant="secondary"
                onClick={closeModal({ onHide, resetForm })}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <BootstrapButton
                variant="success"
                type="submit"
                label="Save"
                labelWhenSubmitting="Saving"
                isSubmitting={isSubmitting}
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default NotificationAddForm;
