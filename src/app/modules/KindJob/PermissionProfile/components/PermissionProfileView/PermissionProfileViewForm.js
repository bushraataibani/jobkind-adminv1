import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import Select from "react-select";
import * as yup from "yup";
import { closeModal } from "../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  permission_profile_id: yup.number(),
  title: yup.string().trim(),
  role: yup.string().trim(),
});

const StaffViewForm = ({
  show,
  onHide,
  savePermissionProfile,
  selectedPermissionProfile,
  permissionData,
  getAllSuperRoles,
  setPermissionData,
  // selectedPermission,
}) => {
  const [isEditing, setIsEditing] = useState(true);

  console.log(permissionData, "permissionData");

  const init = {
    permission_profile_id:
      selectedPermissionProfile?.permission_profile_id?.data || 0,
    title: selectedPermissionProfile?.title?.data || "",
    roleData: selectedPermissionProfile?.role?.dataObj || [],
  };

  // const handlePermissionChange = (data, index, event, i, j) => {
  //   let { name, checked } = event.target;
  //   let list = JSON.parse(JSON.stringify(data));
  //   list[index]["json_value"][name] = checked;
  //   setPermissionData(list);
  //   return list;
  // };

  // const handleSubPermssionChange = (data, index, event, i) => {
  //   let { name, checked } = event.target;
  //   let list = JSON.parse(JSON.stringify(data));
  //   list[index].parent_menu[i]["json_value"][name] = checked;
  //   setPermissionData(list);
  //   return list;
  // };

  // const handleNestedPermssionChange = (data, index, event, i, j) => {
  //   let { name, checked } = event.target;
  //   let list = JSON.parse(JSON.stringify(data));
  //   list[index].parent_menu[i].parent_menu[j]["json_value"][name] = checked;
  //   setPermissionData(list);
  //   return list;
  // };

  const handlePermissionChange = (data, index, event, i, j) => {
    let { name, checked } = event.target;
    let list = JSON.parse(JSON.stringify(data));
    list[index]["json_value"][name] = checked;

    if (list[index].parent_menu.length > 0) {
      list[index].parent_menu.map((item, index) => {
        item.json_value[name] = checked;

        if (item?.parent_menu && item?.parent_menu?.length > 0) {
          item.parent_menu.forEach((data, idx) => {
            data.json_value[name] = checked;
          });
        }

        return item;
      });
    }

    setPermissionData(list);
    return list;
  };

  const handleSubPermssionChange = (data, index, event, i) => {
    let { name, checked } = event.target;
    let list = JSON.parse(JSON.stringify(data));
    list[index].parent_menu[i]["json_value"][name] = checked;

    if (list[index].parent_menu[i]["json_value"][name] === false) {
      list[index]["json_value"][name] = false;
    }

    if (
      list[index].parent_menu[i].parent_menu &&
      list[index].parent_menu[i].parent_menu.length > 0
    ) {
      list[index].parent_menu[i].parent_menu.forEach((data, idx) => {
        data.json_value[name] = checked;
      });
    }

    setPermissionData(list);
    return list;
  };

  const handleNestedPermssionChange = (data, index, event, i, j) => {
    let { name, checked } = event.target;
    let list = JSON.parse(JSON.stringify(data));
    list[index].parent_menu[i].parent_menu[j]["json_value"][name] = checked;

    if (
      list[index].parent_menu[i].parent_menu[j]["json_value"][name] === false
    ) {
      list[index].parent_menu[i]["json_value"][name] = false;
    }

    setPermissionData(list);
    return list;
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          permission_profile_id: values?.permission_profile_id,
          title: values?.title,
          role_id: values?.role_id,
          permissions: permissionData ? permissionData : [],
        };

        savePermissionProfile({ ...obj })
          .then(() => {
            closeModal({ setIsEditing, onHide, resetForm })();
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
        <Form onSubmit={handleSubmit} noValidate>
          {console.log(
            values,
            selectedPermissionProfile,
            "selectedPermissionProfile"
          )}
          <Dialog open={show} scroll={"paper"} maxWidth="md" fullWidth={true}>
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
                Staff
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      disabled={isSubmitting || isEditing}
                      onBlur={handleBlur}
                      isInvalid={touched.title && errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Role</Form.Label>
                    <Select
                      isDisabled={isSubmitting || isEditing}
                      options={getAllSuperRoles.map((v) => ({
                        label: v?.Title,
                        value: v?.Id,
                      }))}
                      menuPlacement="auto"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 1301 }),
                      }}
                      value={values?.roleData || []}
                      classNamePrefix="reactselect-select"
                      onChange={(data) => {
                        setFieldValue("role_id", data?.value || []);
                        setFieldValue("roleData", data || []);
                      }}
                      isSearchable={true}
                      placeholder="Select Role"
                      noOptionsMessage={() => "No role Found"}
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
                  <Form.Label style={{ fontWeight: 600 }}>
                    Select Permission
                  </Form.Label>
                  <Form.Group>
                    {permissionData?.map((data, index) => (
                      <Box
                        key={index}
                        sx={{
                          border: "1px solid #bcbbf854",
                          marginBottom: "10px",
                          padding: "10px",
                          background: "#bcbbf854",
                        }}
                      >
                        <FormControlLabel
                          value="is_check"
                          sx={{
                            fontWeight: 600,
                            color: "#3f4254 !important",
                            flexDirection: "row",
                          }}
                          control={
                            <Checkbox
                              checked={data?.json_value?.is_check}
                              disabled={isSubmitting || isEditing}
                              color="primary"
                              onChange={(event) =>
                                handlePermissionChange(
                                  permissionData,
                                  index,
                                  event
                                )
                              }
                              name="is_check"
                            />
                          }
                          label={data?.menu_name}
                        />
                        {data?.parent_menu?.length > 0 && (
                          <Box
                            sx={{
                              background: "#fff",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {data?.parent_menu?.map((menu, i) => (
                              <React.Fragment key={i}>
                                <Box
                                  key={i}
                                  sx={{
                                    border:
                                      menu?.parent_menu?.length > 0 &&
                                      "1px solid #bcbbf854",
                                    background:
                                      menu?.parent_menu?.length > 0 &&
                                      "#bcbbf854",
                                    padding:
                                      menu?.parent_menu?.length > 0 && "5px",
                                  }}
                                >
                                  <FormControlLabel
                                    value={menu?.json_value?.is_check}
                                    sx={{
                                      fontWeight: 600,
                                      color: "#3f4254 !important",
                                      flexDirection: "row",
                                    }}
                                    control={
                                      <Checkbox
                                        checked={menu?.json_value?.is_check}
                                        disabled={isSubmitting || isEditing}
                                        color="primary"
                                        onChange={(event) =>
                                          handleSubPermssionChange(
                                            permissionData,
                                            index,
                                            event,
                                            i
                                          )
                                        }
                                        name="is_check"
                                      />
                                    }
                                    label={menu?.menu_name}
                                  />
                                </Box>
                                {menu?.parent_menu?.length > 0 &&
                                  menu?.parent_menu?.map((sub, j) => (
                                    <React.Fragment key={j}>
                                      <FormControlLabel
                                        value={sub?.json_value?.is_check}
                                        sx={{
                                          fontWeight: 600,
                                          color: "#3f4254 !important",
                                          flexDirection: "row",
                                        }}
                                        control={
                                          <Checkbox
                                            checked={sub?.json_value?.is_check}
                                            disabled={isSubmitting || isEditing}
                                            color="primary"
                                            onChange={(event) =>
                                              handleNestedPermssionChange(
                                                permissionData,
                                                index,
                                                event,
                                                i,
                                                j
                                              )
                                            }
                                            name="is_check"
                                          />
                                        }
                                        label={sub?.menu_name}
                                      />
                                    </React.Fragment>
                                  ))}
                              </React.Fragment>
                            ))}
                          </Box>
                        )}
                      </Box>
                    ))}
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

              {!isEditing ? (
                <BootstrapButton
                  variant="success"
                  type="submit"
                  label="Save"
                  labelWhenSubmitting="Saving"
                  isSubmitting={isSubmitting}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                />
              ) : (
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default StaffViewForm;
