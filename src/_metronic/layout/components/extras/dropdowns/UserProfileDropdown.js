/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

export function UserProfileDropdown() {
  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
        <div className="navi navi-spacer-x-0 pt-5">
          <div className="navi-footer  px-8 py-5">
            <Link
              to="/logout"
              className="btn btn-light-primary font-weight-bold"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
