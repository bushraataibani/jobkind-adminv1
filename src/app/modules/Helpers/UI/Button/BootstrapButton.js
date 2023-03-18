import { CircularProgress } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";

const BootstrapButton = ({
  label,
  labelWhenSubmitting,
  variant = "success",
  handleSubmit,
  isSubmitting = false,
  disabled = false,
  className = "",
  ...otherProps
}) => {
  return (
    <Button
      variant={variant}
      onClick={handleSubmit}
      disabled={disabled || isSubmitting}
      className={
        labelWhenSubmitting
          ? "d-flex align-items-center" + className
          : className
      }
      style={{ whiteSpace: "nowrap" }}
      {...otherProps}
    >
      {isSubmitting && (
        <CircularProgress
          size={20}
          thickness={3.3}
          color="inherit"
          className="mr-1"
        />
      )}

      <span>{isSubmitting ? labelWhenSubmitting : label}</span>
    </Button>
  );
};

export default BootstrapButton;
