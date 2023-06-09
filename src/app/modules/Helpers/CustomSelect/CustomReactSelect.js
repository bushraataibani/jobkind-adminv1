import React from "react";
import Select from "react-select";
import SimpleValue from "react-select-simple-value";

const CustomReactSelect = ({
  options,
  value,
  allowSort = true,
  NoOptionsMsg = "",
  ...props
}) => (
  <SimpleValue
    options={
      !allowSort
        ? options
        : options
            ?.slice(0)
            .sort((a, b) =>
              typeof a.label === "number" && typeof b.label === "number"
                ? a.label - b.label
                : a.label.localeCompare(b.label)
            )
    }
    value={value}
  >
    {(simpleProps) => (
      <Select
        {...simpleProps}
        {...props}
        // isDisabled={props.disabled}
        value={value === "" ? "" : simpleProps.value}
        noOptionsMessage={() =>
          NoOptionsMsg !== "" ? NoOptionsMsg : "No options"
        }
      />
    )}
  </SimpleValue>
);

export default CustomReactSelect;
