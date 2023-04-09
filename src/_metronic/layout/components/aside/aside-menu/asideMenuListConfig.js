const dashboardItem = {
  label: "Dashboard",
  FWIconClassName: "fas fa-layer-group",
  linkTo: "/dashboard",
  checkIfLicenseExist: true,
  licenseCheckField: null,
  permissionCheckField: "DASHBOARD_ADMIN_PAGE",
  sectionLabel: "NO_LABEL",
};

const userItem = {
  label: "Users",
  FWIconClassName: "fas fa-users",
  linkTo: "/users",
  checkIfLicenseExist: true,
  licenseCheckField: null,
  permissionCheckField: "USERS_ADMIN_PAGE",
  sectionLabel: "NO_LABEL",
};

const modules = [
  {
    label: "Master",
    FWIconClassName: "fas fa-th-list",
    linkTo: "/master",
    checkIfLicenseExist: true,
    licenseCheckField: null,
    permissionCheckField: "MASTER_ADMIN_PAGE",
    sectionLabel: "Modules",
    items: [
      {
        label: "College",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/college",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Department",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/department",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Industry",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/industry",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Skill",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/skill",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Language",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/language",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Education",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/education",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Degree",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/degree",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Specialization",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/specialization",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Country",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/country",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "State",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/state",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "City",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/city",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Area",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/area",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Role",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/role",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
    ],
  },
];

export const allMenuItems = [dashboardItem, userItem, ...modules];

export const arrayToObjectArray = (arr) => {
  let ob = {};

  arr.forEach((a) => {
    ob = {
      ...ob,
      [a.sectionLabel]: {
        ...ob[a.sectionLabel],
        label: a.sectionLabel,
        items: [...(ob[a.sectionLabel]?.items || []), a],
      },
    };
  });

  return ob;
};
