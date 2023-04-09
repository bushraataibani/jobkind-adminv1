import { Button } from "@mui/material";
import React, { useState } from "react";

const TableCellExpandList = ({
  list = [],
  minItemsToShow,
  renderItem,
  containerStyles,
}) => {
  const [isExapnded, setisExapnded] = useState(false);
  return (
    <>
      <div style={containerStyles}>
        {list
          .slice(0, isExapnded ? list.length : minItemsToShow)
          .map((item) => renderItem(item))}
      </div>

      {list.length > minItemsToShow && (
        <Button
          onClick={() => setisExapnded((prev) => !prev)}
          style={{
            width: "100%",
            textTransform: "lowercase",
            color: "#444",
            background: isExapnded
              ? "transparent"
              : `linear-gradient(0deg, rgb(231 231 231) 0%, rgba(255,255,255,0) 100%)`,
          }}
        >
          {/* {isExapnded ? <ExpandLessIcon /> : <ExpandMoreIcon />}{" "} */}
          {isExapnded ? "show less" : "show more"}{" "}
        </Button>
      )}
    </>
  );
};

export default TableCellExpandList;
