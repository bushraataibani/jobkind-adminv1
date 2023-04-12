import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { Col, Form } from "react-bootstrap";
import FieldSet from "../../../../../../Helpers/FieldSet/FieldSet";
import { typeOptions } from "./PlanAddForm";

const PlanMetaAddForm = ({
  planMetaDetails,
  setPlanMetaDetails,
  isSubmitting,
}) => {
  const handleAddClick = () => {
    setPlanMetaDetails([
      ...planMetaDetails,
      {
        plan_meta_id: 0,
        type: "",
        title: "",
      },
    ]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    setPlanMetaDetails((prev) => {
      let list = JSON.parse(JSON.stringify(planMetaDetails));

      list[index][name] = value;
      return list;
    });
  };

  const handleRemoveClick = (index) => {
    setPlanMetaDetails((prev) => {
      let tempData = JSON.parse(JSON.stringify(planMetaDetails));
      tempData.splice(index, 1);
      return tempData;
    });
  };

  return (
    <>
      {planMetaDetails.map((item, index) => (
        <FieldSet
          key={index}
          title={`item ${index + 1}`}
          containerStyles={{
            width: { sm: "100%" },
            padding: "10px",
            marginTop: "0px",
          }}
        >
          <Form.Row>
            <Col sm={12} md={3}>
              <Form.Group md="1" className="required">
                <Form.Label style={{ fontWeight: 600 }}>
                  Plan Meta ID
                </Form.Label>
                <Form.Control
                  type="text"
                  name="plan_meta_id"
                  value={item.plan_meta_id}
                  disabled={true}
                  autoFocus
                />
              </Form.Group>
            </Col>
            <Col sm={12} md={3}>
              <Form.Group className="required">
                <Form.Label style={{ fontWeight: 600 }}>Type</Form.Label>

                <Form.Control
                  as="select"
                  name="type"
                  value={item.type || ""}
                  onChange={(e) => handleInputChange(e, index)}
                  disabled={isSubmitting}
                >
                  <option value={""} key={""} style={{ fontStyle: "italic" }}>
                    Select Type
                  </option>
                  {typeOptions?.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={12} md={3}>
              <Form.Group className="required">
                <Form.Label style={{ fontWeight: 600 }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={item.title}
                  disabled={isSubmitting}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </Form.Group>
            </Col>
            {planMetaDetails.length - 1 === index && (
              <Col
                sm={12}
                md={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tooltip
                  disableInteractive={true}
                  arrow
                  title={"Add Meta Details"}
                  placement="bottom"
                >
                  <IconButton onClick={handleAddClick} disabled={isSubmitting}>
                    <AddCircleOutlineIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        width: "1.6rem",
                        height: "1.6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Col>
            )}
            {planMetaDetails.length - 1 !== 0 && (
              <Col
                sm={12}
                md={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tooltip
                  disableInteractive={true}
                  arrow
                  title={"Remove Meta Details"}
                  placement="bottom"
                >
                  <IconButton
                    onClick={() => {
                      handleRemoveClick(index);
                    }}
                    disabled={isSubmitting}
                  >
                    <HighlightOffIcon
                      color="error"
                      fontSize="large"
                      sx={{
                        width: "1.6rem",
                        height: "1.6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Col>
            )}
          </Form.Row>
        </FieldSet>
      ))}
    </>
  );
};

export default PlanMetaAddForm;
