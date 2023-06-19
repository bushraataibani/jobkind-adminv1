import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton, styled, Tooltip } from "@mui/material";
import React from "react";

const Btns = styled("div")(({ theme, ...rest }) => ({
  position: "absolute",
  right: "5px",
  top: "5px",
  display: "flex",
  gap: "5px",
  zIndex: 1,
}));

const Btn = styled(IconButton)(({ theme, ...rest }) => ({
  padding: "4px",
  aspectRatio: "1 / 1",
  width: "30px",
  position: "relative",
}));

const CustomPreview = ({
  children,
  EditIcon = CreateOutlinedIcon,
  DeleteIcon = DeleteOutlineOutlinedIcon,
  editHandler,
  isSubmitting,
  deleteHandler,
  editTooltipText,
  deleteTooltipText,
  showDeleteButton = true,
  showEditButton = true,
  styles: { rootStyles = {}, childrenStyles = {} } = {},
  fileAccept = "image/svg+xml",
}) => {
  return (
    <div style={{ position: "relative", width: "max-content", ...rootStyles }}>
      <Btns>
        {showEditButton && (
          <Tooltip disableInteractive={true} arrow title={editTooltipText}>
            <span>
              <Btn
                // onClick={editHandler}
                disabled={isSubmitting}
                style={{ backgroundColor: "#00000087" }}
              >
                <label style={{ margin: 0, position: "absolute" }}>
                  <EditIcon htmlColor="#fff" />

                  <input
                    style={{ display: "none" }}
                    onChange={editHandler}
                    disabled={isSubmitting}
                    type="file"
                    accept={fileAccept}
                  />
                </label>
              </Btn>
            </span>
          </Tooltip>
        )}

        {showDeleteButton && (
          <Tooltip disableInteractive={true} arrow title={deleteTooltipText}>
            <span>
              <Btn
                onClick={deleteHandler}
                disabled={isSubmitting}
                style={{ backgroundColor: "#00000087" }}
              >
                <DeleteIcon htmlColor="#fff" />
              </Btn>
            </span>
          </Tooltip>
        )}
      </Btns>
      <div style={{ width: "max-content", ...childrenStyles }}>{children}</div>
    </div>
  );
};

export default CustomPreview;
