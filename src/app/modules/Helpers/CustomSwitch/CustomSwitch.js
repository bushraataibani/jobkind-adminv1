import { styled } from "@mui/material";
import React from "react";

const Switch = styled("span", {
  shouldForwardProp: (props) => props !== "offLabel",
})(({ theme, ...rest }) => {
  return {
    border: "1px solid #d6d7dd",
    borderRadius: "13px",
    position: "relative",
    display: "block",
    width: "150px",
    height: "35px",
    background: "#fefefe",

    cursor: "pointer",
    boxShadow: "0 30px 50px -10px #ccc",
    "&::after": {
      content: `"${rest.offLabel}"`,
      backgroundColor: theme.palette.error.main,
      color: "#fff",
      position: "absolute",
      top: "50%",
      left: "5%",
      transform: "translate(-5%, -51%)",
      fontSize: "0.9rem",
      width: "51%",
      height: "85%",
      display: "grid",
      placeItems: "center",
      borderRadius: "10px",
      transition: "all 250ms ease",
      ...rest?.style.switchOffStyles,
    },
  };
});

const Checkbox = styled("input", {
  shouldForwardProp: (prop) => prop !== "onLabel",
})(({ theme, ...rest }) => ({
  display: "none",
  "&:checked ~ .Custom-Switch::after": {
    left: "50%",
    content: `"${rest.onLabel}"`,
    backgroundColor: theme.palette.success.main,
  },
  "&:disabled ~ .Custom-Switch::after": {
    opacity: 0.4,
  },
  // ...rest.switchOffStyles.backgroundColor,
}));

const CustomSwitch = ({
  onLabel = "Enable",
  offLabel = "Disable",
  checked = false,
  onChange,
  disabled = false,
  switchSx = {},
  switchOffStyles,
}) => {
  return (
    <>
      <label style={{ margin: "0px", width: "max-content" }}>
        <Checkbox
          type="checkbox"
          name="checkbox"
          onLabel={onLabel}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <Switch
          offLabel={offLabel}
          style={(switchSx, { switchOffStyles: switchOffStyles })}
          className={"Custom-Switch"}
        ></Switch>
      </label>
    </>
  );
};

export default CustomSwitch;
