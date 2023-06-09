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
