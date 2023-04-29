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
  allEmployerJob: [],
  allEmployerApplyJob: [],

  empIsLoading: true,
  empPage: 0,
  empDataCount: 0,
  empDataPerPage: 10,

  empJobIsLoading: true,
  empJobPage: 0,
  empJobDataCount: 0,
  empJobDataPerPage: 10,
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
    setAllEmployerJob: (state, action) => {
      state.allEmployerJob = action.payload;
    },
    setAllEmployerApplyJob: (state, action) => {
      state.allEmployerApplyJob = action.payload;
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
    setEmpJobPageConfigData: (state, action) => {
      switch (action.payload.type) {
        case "SET_PAGE":
          state.empJobPage = action.payload.data;
          break;
        case "SET_DATA_COUNT":
          state.empJobDataCount = action.payload.data;
          break;
        case "SET_IS_LOADING":
          state.empJobIsLoading = action.payload.data;
          break;
        case "SET_DATA_PER_PAGE":
          state.empJobDataPerPage = action.payload.data;
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
