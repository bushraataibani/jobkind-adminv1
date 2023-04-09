/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import { Box, ClickAwayListener, Divider, Fade, Popper } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export function UserProfileDropdown() {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsDropdownOpen((previousOpen) => !previousOpen);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsDropdownOpen(false)}>
      <Box sx={{ position: "relative" }} className="topbar-item">
        <div onClick={handleClick} id="dropdown-toggle-user-profile">
          <div className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2">
            <>
              <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
                Hi,
              </span>
              <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
                {user.first_name}
              </span>
              <span className="symbol symbol-35 symbol-light-success">
                <span className="symbol-label font-size-h5 font-weight-bold">
                  {user.first_name[0]}
                </span>
              </span>
            </>
          </div>
        </div>

        <Popper
          id={"transition-popper"}
          open={isDropdownOpen}
          anchorEl={anchorEl}
          transition
          className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround  "
          style={{
            zIndex: 98,
            // width: "max-content",
            width: "260px",
          }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <div
                className="d-flex m-3 align-items-center bg-white"
                style={{
                  boxShadow: "0px 2px 8px #aaa",
                  // position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexFlow: "column",
                  borderRadius: "8px",
                  gap: "8px",
                  padding: "15px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexFlow: "row",
                    gap: "14px",
                    width: "100%",
                    paddingBottom: "0",
                  }}
                >
                  <span className="symbol symbol-35 symbol-light-success">
                    <span
                      style={{ height: "45px", width: "45px" }}
                      className="symbol-label font-size-h5 font-weight-bold"
                    >
                      {user.first_name.charAt(0)}
                    </span>
                  </span>
                  <div className="d-flex flex-column">
                    <div className="font-weight-bold font-size-h5 text-dark-75">
                      {user.first_name} {user.last_name}
                    </div>
                  </div>
                </Box>
                <Divider style={{ height: "2px", width: "100%" }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexFlow: "column",
                    gap: "5px",
                  }}
                >
                  <button
                    className="btn btn-bold"
                    onClick={() => history.push("/logout")}
                    style={{
                      background: "#242368",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Sign out
                  </button>
                </Box>
              </div>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
