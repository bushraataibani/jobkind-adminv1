/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React from "react";
import { useHistory } from "react-router-dom";

export function QuickUser() {
  const history = useHistory();

  const logoutClick = () => {
    const toggle = document.getElementById("kt_quick_user_toggle");
    if (toggle) {
      toggle.click();
    }
    history.push("/logout");
  };

  return (
    <div
      id="kt_quick_user"
      className="offcanvas offcanvas-right offcanvas p-10"
    >
      <div className="offcanvas-content pr-5 mr-n5">
        <div className="d-flex align-items-center mt-5">
          <div className="d-flex flex-column">
            {/* <Link to="/logout" className="btn btn-light-primary btn-bold">
                Sign Out
              </Link> */}
            <button
              className="btn btn-light-primary btn-bold"
              onClick={logoutClick}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
