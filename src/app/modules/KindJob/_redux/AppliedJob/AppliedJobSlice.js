import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allAppliedJob: [],
  selectedAppliedJob: null,
  page: 0,
  filter: {},
  dataCount: 0,
  dataPerPage: 10,
  sort: {
    name: "ASC",
  },

  allEmployeeAppliedJob: [],
  employedApplyJobProfile: {},
  jobApplyEmployee: {},
  activeJobIndex: 0,
  activeJobData: {},
};

export const AppliedJobSlice = createSlice({
  name: "appliedJob",
  initialState: initialState,
  reducers: {
    setAllAppliedJob: (state, action) => {
      state.allAppliedJob = action.payload;
    },
    appliedJobFetched: (state, action) => {
      state.selectedAppliedJob = action.payload;
    },
    setAllEmployeeAppliedJob: (state, action) => {
      state.allEmployeeAppliedJob = action.payload;
    },
    setEmployeeAppliedJobProfile: (state, action) => {
      state.employedApplyJobProfile = action.payload;
    },
    setJobApplyEmployee: (state, action) => {
      state.jobApplyEmployee = action.payload;
    },
    setActiveJobIndex: (state, action) => {
      state.activeJobIndex = action.payload;
    },
    setActiveJobData: (state, action) => {
      state.activeJobData = action.payload;
    },
    removeSelectedAppliedJob: (state) => {
      state.selectedAppliedJob = null;
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
