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
  candidatePage: 0,
  candidateDataCount: 0,
  candidateIsLoading: true,
  candidateDataPerPage: 10,
  allCandidate: [],
  jobTitle: [],
  jobStatus: [],
  city: [],
  applyEmployeePage: 0,
  applyEmployeeDataCount: 0,
  applyEmployeeIsLoading: true,
  applyEmployeeDataPerPage: 10,
  applyEmployeeFilter: {},
  allApplyEmployee: [],
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
    setAllCandidate: (state, action) => {
      state.allCandidate = action.payload;
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
    setCandidatePageConfigData: (state, action) => {
      switch (action.payload.type) {
        case "SET_PAGE":
          state.candidatePage = action.payload.data;
          break;
        case "SET_DATA_COUNT":
          state.candidateDataCount = action.payload.data;
          break;
        case "SET_IS_LOADING":
          state.candidateIsLoading = action.payload.data;
          break;
        case "SET_DATA_PER_PAGE":
          state.candidateDataPerPage = action.payload.data;
          break;
        default:
          break;
      }
    },
    setCandidateFilter: (state, action) => {
      state.candidateFilter = { ...state.candidateFilter, ...action.payload };
    },
    setSortConfig: (state, action) => {
      state.sort = {
        [action.payload.key]: action.payload.order,
      };
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    setJobTitle: (state, action) => {
      state.jobTitle = action.payload;
    },
    setJobStatus: (state, action) => {
      state.jobStatus = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setApplyEmployeePageConfigData: (state, action) => {
      switch (action.payload.type) {
        case "SET_PAGE":
          state.applyEmployeePage = action.payload.data;
          break;
        case "SET_DATA_COUNT":
          state.applyEmployeeDataCount = action.payload.data;
          break;
        case "SET_IS_LOADING":
          state.applyEmployeeIsLoading = action.payload.data;
          break;
        case "SET_DATA_PER_PAGE":
          state.applyEmployeeDataPerPage = action.payload.data;
          break;
        default:
          break;
      }
    },
    setApplyEmployeeFilter: (state, action) => {
      state.applyEmployeeFilter = {
        ...state.applyEmployeeFilter,
        ...action.payload,
      };
    },
    setAllApplyEmployee: (state, action) => {
      state.allApplyEmployee = action.payload;
    },
  },
});
