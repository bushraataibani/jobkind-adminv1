/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";
import { allMenuItems, arrayToObjectArray } from "./asideMenuListConfig";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPermission } from "../../../../../app/modules/KindJob/_redux/PermissionProfile/PermissionProfileCrud";
import { PermissionProfileSlice } from "../../../../../app/modules/KindJob/_redux/PermissionProfile/PermissionProfileSlice";

const ListItem = ({ label, linkTo, FWIconClassName, getMenuItemActive }) => (
  <li
    className={`menu-item aside-item ${getMenuItemActive(linkTo, false)}`}
    aria-haspopup="true"
  >
    <NavLink className="menu-link" to={linkTo}>
      <i className={`${FWIconClassName} svg-icon menu-icon`}></i>
      <span className="menu-text">{label}</span>
    </NavLink>
  </li>
);

const SubMenuItemWithList = ({
  label,
  linkTo,
  FWIconClassName,
  items = [],
  getMenuItemActive,
}) => {
  return (
    <li
      className={`menu-item menu-item-submenu aside-item`}
      aria-haspopup="true"
    >
      <NavLink className="menu-link menu-toggle" to={linkTo}>
        <i className={`${FWIconClassName} svg-icon menu-icon`}></i>
        <span className="menu-text">{label}</span>
        <i className="menu-arrow" />
      </NavLink>
      <div className="menu-submenu ">
        <i className="menu-arrow" />
        <ul className="menu-subnav">
          {items.map((d) => (
            <ListItem
              key={d.label}
              label={d.label}
              linkTo={d.linkTo}
              FWIconClassName={d.FWIconClassName}
              getMenuItemActive={getMenuItemActive}
            />
          ))}
        </ul>
      </div>
    </li>
  );
};

const SectionItem = ({ label }) =>
  label !== "NO_LABEL" && (
    <li className="menu-section ">
      <h4 className="menu-text">{label}</h4>
      <i className="menu-icon flaticon-more-v2"></i>
    </li>
  );

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { actions } = PermissionProfileSlice;

  const { allPermissionData } = useSelector(
    (state) => ({
      allPermissionData: state.permission.allPermissionData,
    }),
    shallowEqual
  );

  console.log(allPermissionData, "allPermissionData");

  const getPermissionList = () => {
    getAllPermission({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        dispatch(
          actions.setAllPermissionData(res?.data?.data?.permission_data)
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getPermissionList();
  }, []);

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul
        className={`my-custom-nav menu-nav ${layoutProps.ulClasses}`}
        style={{ overflow: "auto", height: "100%" }}
      >
        {/*begin::1 Level*/}

        {Object.values(arrayToObjectArray(allMenuItems)).map((v) => {
          return (
            <React.Fragment key={v.label}>
              <SectionItem label={v.label} />
              {v.items.map((d) => {
                return d.items ? (
                  <SubMenuItemWithList
                    key={d.label}
                    items={d.items}
                    label={d.label}
                    linkTo={d.linkTo}
                    FWIconClassName={d.FWIconClassName}
                    getMenuItemActive={getMenuItemActive}
                  />
                ) : (
                  <ListItem
                    key={d.label}
                    label={d.label}
                    linkTo={d.linkTo}
                    FWIconClassName={d.FWIconClassName}
                    getMenuItemActive={getMenuItemActive}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
        {/*end::1 Level*/}

        {/* {allPermissionData?.map((data, index) => (
          <li
            className={`menu-item ${getMenuItemActive("/staff", false)}`}
            aria-haspopup="true"
          >
            {console.log(data, "data")}
            <NavLink className="menu-link" to="/staff">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">Users</span>
            </NavLink>
          </li>
        ))} */}

        {/* <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>

        {allPermissionData?.[0]?.json_value.is_check && (
          <li
            className={`menu-item ${getMenuItemActive("/staff", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/staff">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
              </span>
              <span className="menu-text">Users</span>
            </NavLink>
          </li>
        )} */}

        {/* <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/error",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/error">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Code/Error-circle.svg")}
              />
            </span>
            <span className="menu-text">Error Pages</span>
            <i className="menu-arrow" />
          </NavLink>

          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Error Pages</span>
                </span>
              </li>

              <li
                className={`menu-item ${getMenuItemActive("/error/error-v1")}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/error/error-v1">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Error Page - 1</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li> */}
      </ul>
    </>
  );
}
