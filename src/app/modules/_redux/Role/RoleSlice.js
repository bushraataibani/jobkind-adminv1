import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allRole: [],
  selectedRole: null,
  page: 0,
  filter: {},
  dataCount: 0,
  dataPerPage: 10,
  sort: {
    name: "ASC",
  },
};

export const RoleSlice = createSlice({
  name: "role",
  initialState: initialState,
  reducers: {
    setAllRole: (state, action) => {
      state.allRole = action.payload;
    },
    stateFetched: (state, action) => {
      state.selectedRole = action.payload;
    },
    removeSelectedRole: (state) => {
      state.selectedRole = null;
    },
    setPageConfigData: (state, action) => {
      switch (action.payload.type) {
        case "SET_PAGE":
          state.page = action.payload.data;
          break;
        case "SET_DATA_COUNT":
          state.dataCount = action.payload.data;
          break;
        case "SET_IS_LOADING":
          state.isLoading = action.payload.data;
          break;
        case "SET_DATA_PER_PAGE":
          state.dataPerPage = action.payload.data;
          break;
        default:
          break;
      }
    },
    setSortConfig: (state, action) => {
      state.sort = {
        [action.payload.key]: action.payload.order,
      };
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
