import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allEmployer: [],
  allEmpProfile: {},
  selectedEmployer: null,
  page: 0,
  filter: {},
  dataCount: 0,
  dataPerPage: 10,
  sort: {
    name: "ASC",
  },
};

export const EmployerSlice = createSlice({
  name: "employer",
  initialState: initialState,
  reducers: {
    setAllEmployer: (state, action) => {
      state.allEmployer = action.payload;
    },
    employerFetched: (state, action) => {
      state.selectedEmployer = action.payload;
    },
    setAllEmpProfile: (state, action) => {
      state.allEmpProfile = action.payload;
    },
    removeSelectedEmployer: (state) => {
      state.selectedEmployer = null;
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
