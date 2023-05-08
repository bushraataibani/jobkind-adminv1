import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { successMessage } from "../../../../Helpers/Alert/messages";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";
import {
  addCoin,
  getEmployerCoinHistory,
} from "../../../_redux/Employer/EmployerCrud";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";

const schema = yup.object({
  user_id: yup.number(),
  coin: yup.number(),
});

const AddCoinModal = ({ setIsSubmitting, isSubmitting }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;
  const { actions: generalActions } = generalSlice;
  const [isEditing, setIsEditing] = useState(true);

  const { selectedEmployer } = useSelector(
    (state) => ({
      selectedEmployer: state.employer.selectedEmployer,
    }),
    shallowEqual
  );

  const init = {
    user_id: selectedEmployer?.user_id?.data && selectedEmployer?.user_id?.data,
    coin: "",
  };

  const handleClose = (resetForm) => {
    resetForm();
    setIsEditing(true);
  };

  const addCoinToServer = (data) => {
    return addCoin(data).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Coin", "added"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getEmployerCoinHistory({
        search: "",
        page_no: 0,
        page_record: 10,
        user_id: parseInt(
          selectedEmployer?.user_id?.data && selectedEmployer?.user_id?.data
        ),
      })
        .then((res) => {
          dispatch(
            actions.setEmpCoinHistory(res?.data?.data?.coin_transaction?.rows)
          );
        })
        .catch((error) => console.error(error))
        .finally(() => {
          dispatch(actions.setLoading(false));
        });
    });
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          user_id: values?.user_id,
          coin: values?.coin,
        };

        addCoinToServer({ ...obj })
          .then(() => {
            handleClose(resetForm);
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
          <Form.Row>
            <Col sm={9} md={9}>
              <Form.Group className="required">
                <Form.Label style={{ fontWeight: 600 }}>Coin</Form.Label>
                <Form.Control
                  type="number"
                  name="coin"
                  value={values.coin}
                  onBlur={handleBlur}
                  disabled={isSubmitting || isEditing}
                  isInvalid={touched.coin && errors.coin}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.coin}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={3} md={3}>
              <Form.Group style={{ marginTop: "27px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {!isEditing ? (
                    <>
                      <Button
                        variant="secondary"
                        onClick={() => handleClose(resetForm)}
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
                    </>
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
                </div>
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default AddCoinModal;
