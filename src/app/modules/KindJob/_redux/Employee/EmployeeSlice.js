import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allEmployee: [],
  selectedEmployee: null,
  page: 0,
  filter: {},
  dataCount: 0,
  dataPerPage: 10,
  sort: {
    name: "ASC",
  },
  totalJobs: "",
  allJobs: [],
  allJobpage: 0,
  allJobDataCount: 0,
  allJobDataPerPage: 10,
  allSuccessJobs: [],
  successpage: 0,
  successDataCount: 0,
  successDataPerPage: 10,
  allEmpProfile: {},
  fileProgress: 0,
};

export const EmployeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    setFileProgress: (state, action) => {
      state.fileProgress = action.payload;
    },
    setAllEmployee: (state, action) => {
      state.allEmployee = action.payload;
    },
    employeeFetched: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllSuccessJobs: (state, action) => {
      state.allSuccessJobs = action.payload;
    },
    setAllEmpProfile: (state, action) => {
      state.allEmpProfile = action.payload;
    },
    removeSelectedEmployee: (state) => {
      state.selectedEmployee = null;
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
    setAllJobPageData: (state, action) => {
      switch (action.payload.type) {
        case "SET_PAGE":
          state.allJobpage = action.payload.data;
          break;
        case "SET_DATA_COUNT":
          state.allJobDataCount = action.payload.data;
          break;
        case "SET_IS_LOADING":
          state.isLoading = action.payload.data;
          break;
        case "SET_DATA_PER_PAGE":
          state.allJobDataPerPage = action.payload.data;
          break;
        default:
          break;
      }
    },
    setSuccessJobPageData: (state, action) => {
      switch (action.payload.type) {
        case "SET_PAGE":
          state.successpage = action.payload.data;
          break;
        case "SET_DATA_COUNT":
          state.successDataCount = action.payload.data;
          break;
        case "SET_IS_LOADING":
          state.isLoading = action.payload.data;
          break;
        case "SET_DATA_PER_PAGE":
          state.successDataPerPage = action.payload.data;
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
