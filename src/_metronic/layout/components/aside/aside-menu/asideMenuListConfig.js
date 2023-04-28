const dashboardItem = {
  label: "Dashboard",
  FWIconClassName: "fas fa-layer-group",
  linkTo: "/dashboard",
  sectionLabel: "NO_LABEL",
};

const modules = [
  {
    label: "Master",
    FWIconClassName: "fas fa-th-list",
    linkTo: "/master",

    sectionLabel: "Modules",
    items: [
      {
        label: "College Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/college",
      },
      {
        label: "Department Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/department",
      },
      {
        label: "Industry Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/industry",
      },
      {
        label: "Skill Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/skill",
      },
      {
        label: "Language Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/language",
      },
      {
        label: "Education Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/education",
      },
      {
        label: "Degree Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/degree",
      },
      {
        label: "Specialization Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/specialization",
      },
      {
        label: "Country Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/country",
      },
      {
        label: "State Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/state",
      },
      {
        label: "City Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/city",
      },
      {
        label: "Area Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/area",
      },
      {
        label: "Role Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/role",
      },
      {
        label: "Job Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/job",
      },
      {
        label: "Plan Master",
        FWIconClassName: "far fa-circle",
        linkTo: "/master/plan",
      },
    ],
  },
];

const staffItem = {
  label: "Staff Master",
  FWIconClassName: "fas fa-users",
  linkTo: "/staff",
  sectionLabel: "NO_LABEL",
};

const permissionProfileItem = {
  label: "permission Profile",
  FWIconClassName: "fas fa-user-shield",
  linkTo: "/permission",
  sectionLabel: "NO_LABEL",
};

const subscribeItem = {
  label: "Subscribe",
  FWIconClassName: "fas fa-gifts",
  linkTo: "/subscribe",
  sectionLabel: "NO_LABEL",
};

const employeeItem = {
  label: "Employee",
  FWIconClassName: "fas fa-id-card",
  linkTo: "/employee",
  sectionLabel: "NO_LABEL",
};

const employer = [
  {
    label: "Employer Management",
    FWIconClassName: "fas fa-th-list",
    linkTo: "/employer-management",

    sectionLabel: "Employer",
    items: [
      {
        label: "Employer",
        FWIconClassName: "far fa-circle",
        linkTo: "/employer-management/employer",
      },
      {
        label: "Job",
        FWIconClassName: "far fa-circle",
        linkTo: "/employer-management/job",
      },
    ],
  },
];

export const allMenuItems = [
  dashboardItem,
  staffItem,
  permissionProfileItem,
  subscribeItem,
  employeeItem,
  ...employer,
  ...modules,
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
