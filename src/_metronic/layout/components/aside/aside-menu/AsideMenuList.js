/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";
import {
  allMenuItems,
  arrayToObjectArray,
  compareMenu,
  configList,
} from "./asideMenuListConfig";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPermission } from "../../../../../app/modules/KindJob/_redux/PermissionProfile/PermissionProfileCrud";
import { PermissionProfileSlice } from "../../../../../app/modules/KindJob/_redux/PermissionProfile/PermissionProfileSlice";

export const permissionList = [
  {
    permission_id: 3864,
    uuid: null,
    parent_permission_id: 0,
    permission_profile_id: 23,
    menu_name: "Dashboard",
    json_value: {
      is_check: true,
    },
    created_datetime: "2023-04-24T05:32:45.000Z",
    updated_datetime: null,
    is_deleted: 0,
    original_permission_id: 1,
    parent_menu: [],
  },
  {
    permission_id: 3865,
    uuid: null,
    parent_permission_id: 0,
    permission_profile_id: 23,
    menu_name: "Staff Master",
    json_value: {
      is_check: true,
    },
    created_datetime: "2023-04-24T05:32:45.000Z",
    updated_datetime: null,
    is_deleted: 0,
    original_permission_id: 2,
    parent_menu: [
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3865,
        permission_profile_id: 23,
        menu_name: "Staff Add",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 3,
        _permission_id: 3814,
        parent_menu: [],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3865,
        permission_profile_id: 23,
        menu_name: "Staff Edit",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 4,
        _permission_id: 3815,
        parent_menu: [],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3865,
        permission_profile_id: 23,
        menu_name: "Staff Delete",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 5,
        _permission_id: 3816,
        parent_menu: [],
      },
    ],
  },
  {
    permission_id: 3866,
    uuid: null,
    parent_permission_id: 0,
    permission_profile_id: 23,
    menu_name: "permission Profile",
    json_value: {
      is_check: true,
    },
    created_datetime: "2023-04-24T05:32:45.000Z",
    updated_datetime: null,
    is_deleted: 0,
    original_permission_id: 6,
    parent_menu: [
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3866,
        permission_profile_id: 23,
        menu_name: "Profile Add",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 7,
        _permission_id: 3817,
        parent_menu: [],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3866,
        permission_profile_id: 23,
        menu_name: "Profile Edit",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 8,
        _permission_id: 3818,
        parent_menu: [],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3866,
        permission_profile_id: 23,
        menu_name: "Profile Delete",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 9,
        _permission_id: 3819,
        parent_menu: [],
      },
    ],
  },
  {
    permission_id: 3867,
    uuid: null,
    parent_permission_id: 0,
    permission_profile_id: 23,
    menu_name: "Log Statistics",
    json_value: {
      is_check: false,
    },
    created_datetime: "2023-04-24T05:32:45.000Z",
    updated_datetime: null,
    is_deleted: 0,
    original_permission_id: 10,
    parent_menu: [],
  },
  {
    permission_id: 3868,
    uuid: null,
    parent_permission_id: 0,
    permission_profile_id: 23,
    menu_name: "General Master",
    json_value: {
      is_check: true,
    },
    created_datetime: "2023-04-24T05:32:45.000Z",
    updated_datetime: null,
    is_deleted: 0,
    original_permission_id: 11,
    parent_menu: [
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3868,
        permission_profile_id: 23,
        menu_name: "Country Master",
        json_value: {
          is_check: true,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 12,
        _permission_id: 3853,
        parent_menu: [
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3853,
            permission_profile_id: 23,
            menu_name: "Country Add",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 13,
            _permission_id: 3820,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3853,
            permission_profile_id: 23,
            menu_name: "Country Edit",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 14,
            _permission_id: 3821,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3853,
            permission_profile_id: 23,
            menu_name: "Country Delete",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 15,
            _permission_id: 3822,
            parent_menu: [],
          },
        ],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3868,
        permission_profile_id: 23,
        menu_name: "State Master",
        json_value: {
          is_check: true,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 16,
        _permission_id: 3854,
        parent_menu: [
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3854,
            permission_profile_id: 23,
            menu_name: "State Add",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 17,
            _permission_id: 3823,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3854,
            permission_profile_id: 23,
            menu_name: "State Edit",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 18,
            _permission_id: 3824,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3854,
            permission_profile_id: 23,
            menu_name: "State Delete",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 19,
            _permission_id: 3825,
            parent_menu: [],
          },
        ],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3868,
        permission_profile_id: 23,
        menu_name: "City Master",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 20,
        _permission_id: 3855,
        parent_menu: [
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3855,
            permission_profile_id: 23,
            menu_name: "City Add",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 21,
            _permission_id: 3826,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3855,
            permission_profile_id: 23,
            menu_name: "City Edit",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 22,
            _permission_id: 3827,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3855,
            permission_profile_id: 23,
            menu_name: "City Delete",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 23,
            _permission_id: 3828,
            parent_menu: [],
          },
        ],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3868,
        permission_profile_id: 23,
        menu_name: "Collage Master",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 24,
        _permission_id: 3856,
        parent_menu: [
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3856,
            permission_profile_id: 23,
            menu_name: "Collage Add",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 25,
            _permission_id: 3829,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3856,
            permission_profile_id: 23,
            menu_name: "Collage Edit",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 26,
            _permission_id: 3830,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3856,
            permission_profile_id: 23,
            menu_name: "Collage Delete",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 27,
            _permission_id: 3831,
            parent_menu: [],
          },
        ],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3868,
        permission_profile_id: 23,
        menu_name: "Languages Master",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 28,
        _permission_id: 3857,
        parent_menu: [
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3857,
            permission_profile_id: 23,
            menu_name: "Languages Add",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 29,
            _permission_id: 3832,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3857,
            permission_profile_id: 23,
            menu_name: "Languages Edit",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 30,
            _permission_id: 3833,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3857,
            permission_profile_id: 23,
            menu_name: "Languages Delete",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 31,
            _permission_id: 3834,
            parent_menu: [],
          },
        ],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3868,
        permission_profile_id: 23,
        menu_name: "Skill Master",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 32,
        _permission_id: 3858,
        parent_menu: [
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3858,
            permission_profile_id: 23,
            menu_name: "Skill Add",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 33,
            _permission_id: 3835,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3858,
            permission_profile_id: 23,
            menu_name: "Skill Edit",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 34,
            _permission_id: 3836,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3858,
            permission_profile_id: 23,
            menu_name: "Skill Delete",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 35,
            _permission_id: 3837,
            parent_menu: [],
          },
        ],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3868,
        permission_profile_id: 23,
        menu_name: "Industry Master",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 36,
        _permission_id: 3859,
        parent_menu: [
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3859,
            permission_profile_id: 23,
            menu_name: "Industry Add",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 37,
            _permission_id: 3838,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3859,
            permission_profile_id: 23,
            menu_name: "Industry Edit",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 38,
            _permission_id: 3839,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3859,
            permission_profile_id: 23,
            menu_name: "Industry Delete",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 39,
            _permission_id: 3840,
            parent_menu: [],
          },
        ],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3868,
        permission_profile_id: 23,
        menu_name: "Department Master",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 40,
        _permission_id: 3860,
        parent_menu: [
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3860,
            permission_profile_id: 23,
            menu_name: "Department Add",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 41,
            _permission_id: 3841,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3860,
            permission_profile_id: 23,
            menu_name: "Department Edit",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 42,
            _permission_id: 3842,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3860,
            permission_profile_id: 23,
            menu_name: "Department Delete",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 43,
            _permission_id: 3843,
            parent_menu: [],
          },
        ],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3868,
        permission_profile_id: 23,
        menu_name: "Education Master",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 44,
        _permission_id: 3861,
        parent_menu: [
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3861,
            permission_profile_id: 23,
            menu_name: "Education Add",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 45,
            _permission_id: 3844,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3861,
            permission_profile_id: 23,
            menu_name: "Education Edit",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 46,
            _permission_id: 3845,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3861,
            permission_profile_id: 23,
            menu_name: "Education Delete",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 47,
            _permission_id: 3846,
            parent_menu: [],
          },
        ],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3868,
        permission_profile_id: 23,
        menu_name: "Degree Master",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 48,
        _permission_id: 3862,
        parent_menu: [
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3862,
            permission_profile_id: 23,
            menu_name: "Degree Add",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 49,
            _permission_id: 3847,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3862,
            permission_profile_id: 23,
            menu_name: "Degree Edit",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 50,
            _permission_id: 3848,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3862,
            permission_profile_id: 23,
            menu_name: "Degree Delete",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 51,
            _permission_id: 3849,
            parent_menu: [],
          },
        ],
      },
      {
        permission_id: 0,
        uuid: null,
        parent_permission_id: 3868,
        permission_profile_id: 23,
        menu_name: "Specialisation Master",
        json_value: {
          is_check: false,
        },
        created_datetime: "2023-04-24T05:32:45.000Z",
        updated_datetime: "2023-04-24T05:32:45.000Z",
        is_deleted: 0,
        original_permission_id: 52,
        _permission_id: 3863,
        parent_menu: [
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3863,
            permission_profile_id: 23,
            menu_name: "Specialisation Add",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 53,
            _permission_id: 3850,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3863,
            permission_profile_id: 23,
            menu_name: "Specialisation Edit",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 54,
            _permission_id: 3851,
            parent_menu: [],
          },
          {
            permission_id: 0,
            uuid: null,
            parent_permission_id: 3863,
            permission_profile_id: 23,
            menu_name: "Specialisation Delete",
            json_value: {
              is_check: false,
            },
            created_datetime: "2023-04-24T05:32:45.000Z",
            updated_datetime: "2023-04-24T05:32:45.000Z",
            is_deleted: 0,
            original_permission_id: 55,
            _permission_id: 3852,
            parent_menu: [],
          },
        ],
      },
    ],
  },
  {
    permission_id: 3869,
    uuid: null,
    parent_permission_id: 0,
    permission_profile_id: 23,
    menu_name: "Employee Master",
    json_value: {
      is_check: false,
    },
    created_datetime: "2023-04-24T05:32:45.000Z",
    updated_datetime: null,
    is_deleted: 0,
    original_permission_id: 56,
    parent_menu: [],
  },
  {
    permission_id: 3870,
    uuid: null,
    parent_permission_id: 0,
    permission_profile_id: 23,
    menu_name: "Employer Master",
    json_value: {
      is_check: false,
    },
    created_datetime: "2023-04-24T05:32:45.000Z",
    updated_datetime: null,
    is_deleted: 0,
    original_permission_id: 57,
    parent_menu: [],
  },
];

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

        {Object.values(
          arrayToObjectArray(
            compareMenu(allMenuItems, configList(permissionList))
          )
        ).map((v) => {
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
      </ul>
    </>
  );
}
