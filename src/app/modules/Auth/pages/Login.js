import { useMediaQuery, useTheme } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as Yup from "yup";
import Logo from "../../../../assets/kjLogo.png";
import { loginCrud } from "../_redux/authCrud";
import * as auth from "../_redux/authRedux";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  const { intl } = props;
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("lg"));

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(6, "Minimum 6 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(6, "Minimum 6 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        loginCrud(values.email, values.password)
          .then((res) => {
            disableLoading();
            props.login(res?.data?.data?.token);
          })
          .catch((e) => {
            disableLoading();
            setSubmitting(false);
            setStatus(e?.response?.data?.message);
          });
      }, 1000);
    },
  });

  return (
    <div
      className="login-form login-signin d-flex"
      id="kt_login_signin_form"
      style={{ flexDirection: "column", justifyContent: "center", flex: 1 }}
    >
      <img
        src={Logo}
        style={{
          width: "120px",
          margin: "0 auto",
          marginBottom: "15px",
          display: isMobile || isTab ? "none" : "block",
        }}
        alt="Login"
      />
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">Sign In To Kind Job Admin</h3>
        <p className="text-muted font-weight-bold">
          Enter your email and password
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <InputGroup>
            <input
              placeholder="Password"
              type={showPass ? "text" : "password"}
              className={`form-control  h-auto  ${getInputClasses("password")}`}
              style={{
                padding: "1.25rem",
              }}
              name="password"
              {...formik.getFieldProps("password")}
            />
            <InputGroup.Append>
              <InputGroup.Text
                onClick={() => setShowPass((prev) => !prev)}
                style={{ backgroundColor: "#ffffff" }}
              >
                <i className={showPass ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-center align-items-center">
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={
              formik.isSubmitting ||
              formik.errors.email ||
              formik.errors.password
            }
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
