const dashboardItem = {
  label: "Dashboard",
  FWIconClassName: "fas fa-layer-group",
  linkTo: "/dashboard",
  checkIfLicenseExist: true,
  licenseCheckField: null,
  permissionCheckField: "DASHBOARD_ADMIN_PAGE",
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
        label: "College Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/college",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Department Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/department",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Industry Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/industry",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Skill Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/skill",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Language Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/language",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Education Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/education",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Degree Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/degree",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Specialization Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/specialization",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Country Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/country",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "State Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/state",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "City Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/city",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Area Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/area",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Role Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/role",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Job Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/job",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
      {
        label: "Plan Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/plan",
        checkIfLicenseExist: true,
        licenseCheckField: null,
        permissionPage: "MASTER_ADMIN_PAGE",
        permissionCheckField: "MASTER",
      },
    ],
  },
];

const staffItem = {
  label: "Staff Master",
  FWIconClassName: "fas fa-users",
  linkTo: "/staff",
  checkIfLicenseExist: true,
  licenseCheckField: null,
  permissionCheckField: "USERS_ADMIN_PAGE",
  sectionLabel: "NO_LABEL",
};

const permissionProfileItem = {
  label: "permission Profile",
  FWIconClassName: "fas fa-user-shield",
  linkTo: "/permission",
  checkIfLicenseExist: true,
  licenseCheckField: null,
  permissionCheckField: "USERS_ADMIN_PAGE",
  sectionLabel: "NO_LABEL",
};

const subscribeItem = {
  label: "Subscribe",
  FWIconClassName: "fas fa-gifts",
  linkTo: "/subscribe",
  checkIfLicenseExist: true,
  licenseCheckField: null,
  permissionCheckField: "USERS_ADMIN_PAGE",
  sectionLabel: "NO_LABEL",
};

export const allMenuItems = [
  dashboardItem,
  ...modules,
  staffItem,
  permissionProfileItem,
  subscribeItem,
];

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

export const configList = (permissions) => {
  return permissions
    ?.filter((data) => data?.json_value?.is_check)
    ?.map((data) => data);
};

export const compareMenu = (allMenuItems, permissionItems) => {
  let arr = [];
  for (let index = 0; index < allMenuItems.length; index++) {
    const menuItem = allMenuItems[index];

    for (let j = 0; j < permissionItems.length; j++) {
      const permissionItem = permissionItems[j];

      if (permissionItem.menu_name === menuItem.label) {
        arr.push(menuItem);
      }

      if (menuItem.items && permissionItem.menu_name === "General Master") {
        if (permissionItem?.parent_menu.length > 0) {
          for (
            let index = 0;
            index < permissionItem?.parent_menu.length;
            index++
          ) {
            const subPermissionItem = permissionItem?.parent_menu[index];

            for (let index = 0; index < menuItem.items.length; index++) {
              const subMenuItem = menuItem.items[index];

              if (
                subPermissionItem.menu_name === subMenuItem.label &&
                subPermissionItem?.json_value?.is_check
              ) {
                arr.push(subMenuItem);
              }
            }
          }
        }
      }
    }
  }

  return arr;
};
