import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import Select from "react-select";

const Address = ({
  values,
  handleBlur,
  isSubmitting,
  touched,
  handleChange,
  errors,
  setFieldValue,
  allCity,
  allState,
}) => {
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedState, setSelectedState] = useState([]);

  return (
    <>
      <Form.Row>
        <Col sm={12} md={12}>
          <Form.Group>
            <Form.Label style={{ fontWeight: 600 }}>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              autoFocus={true}
              type="text"
              name="address"
              value={values.address}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.address && errors.address}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={12} md={6}>
          <Form.Group>
            <Form.Label style={{ fontWeight: 600 }}>State</Form.Label>
            <Select
              isDisabled={isSubmitting}
              options={allState.map((v) => ({
                label: v?.state_name,
                value: v?.state_id,
              }))}
              menuPlacement="auto"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 1301 }),
              }}
              value={selectedState || []}
              classNamePrefix="reactselect-select"
              onChange={(state) => {
                setFieldValue("state", state);
                setSelectedState([state]);
              }}
              isSearchable={true}
              placeholder="Select State"
              noOptionsMessage={() => "No State Found"}
              menuPortalTarget={document.querySelector("body")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.state}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={12} md={6}>
          <Form.Group>
            <Form.Label style={{ fontWeight: 600 }}>City</Form.Label>
            <Select
              isDisabled={isSubmitting}
              options={allCity.map((v) => ({
                label: v?.city_name,
                value: v?.city_id,
              }))}
              menuPlacement="auto"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 1301 }),
              }}
              value={selectedCity || []}
              classNamePrefix="reactselect-select"
              onChange={(city) => {
                setFieldValue("city", city);
                setSelectedCity([city]);
              }}
              isSearchable={true}
              placeholder="Select City"
              noOptionsMessage={() => "No City Found"}
              menuPortalTarget={document.querySelector("body")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
    </>
  );
};

export default Address;
