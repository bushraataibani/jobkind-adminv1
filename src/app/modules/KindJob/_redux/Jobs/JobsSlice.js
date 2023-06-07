import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allJobs: [],
  selectedjobs: null,
  page: 0,
  filter: {},
  dataCount: 0,
  dataPerPage: 10,
  sort: {
    name: "ASC",
  },
  empPage: 0,
  empDataCount: 0,
  empIsLoading: true,
  empDataPerPage: 10,
  allEmployee: [],
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    jobsFetched: (state, action) => {
      state.selectedjobs = action.payload;
    },
    setAllEmployee: (state, action) => {
      state.allEmployee = action.payload;
    },
    removeSelectedjobs: (state) => {
      state.selectedjobs = null;
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
    setEmpPageConfigData: (state, action) => {
      switch (action.payload.type) {
        case "SET_PAGE":
          state.empPage = action.payload.data;
          break;
        case "SET_DATA_COUNT":
          state.empDataCount = action.payload.data;
          break;
        case "SET_IS_LOADING":
          state.empIsLoading = action.payload.data;
          break;
        case "SET_DATA_PER_PAGE":
          state.empDataPerPage = action.payload.data;
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
