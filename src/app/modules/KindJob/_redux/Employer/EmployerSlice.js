import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allEmployer: [],
  selectedEmployer: null,
  page: 0,
  filter: {},
  dataCount: 0,
  dataPerPage: 10,
  sort: {
    name: "ASC",
  },

  allEmployerJob: [],
  allEmpProfile: {},
  allEmployerApplyJob: [],
  showEmployerJobDetailsList: false,

  empIsLoading: true,
  empPage: 0,
  empDataCount: 0,
  empDataPerPage: 10,

  appliedJobIsLoading: true,
  appliedJobPage: 0,
  appliedJobDataCount: 0,
  appliedJobDataPerPage: 10,

  coinHistoryIsLoading: true,
  coinHistoryPage: 0,
  coinHistoryDataCount: 0,
  coinHistoryDataPerPage: 10,

  employerJobDetails: {},
  empCoinHistory: [],
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

    setAllEmployerJob: (state, action) => {
      state.allEmployerJob = action.payload;
    },
    setAllEmpProfile: (state, action) => {
      state.allEmpProfile = action.payload;
    },

    setEmpCoinHistory: (state, action) => {
      state.empCoinHistory = action.payload;
    },

    setEmployerJobDetails: (state, action) => {
      state.employerJobDetails = action.payload;
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
    setAppliedJobPageConfigData: (state, action) => {
      switch (action.payload.type) {
        case "SET_PAGE":
          state.appliedJobPage = action.payload.data;
          break;
        case "SET_DATA_COUNT":
          state.appliedJobDataCount = action.payload.data;
          break;
        case "SET_IS_LOADING":
          state.appliedJobIsLoading = action.payload.data;
          break;
        case "SET_DATA_PER_PAGE":
          state.appliedJobDataPerPage = action.payload.data;
          break;
        default:
          break;
      }
    },

    setCoinHistoryPageConfigData: (state, action) => {
      switch (action.payload.type) {
        case "SET_PAGE":
          state.coinHistoryPage = action.payload.data;
          break;
        case "SET_DATA_COUNT":
          state.coinHistoryDataCount = action.payload.data;
          break;
        case "SET_IS_LOADING":
          state.coinHistoryIsLoading = action.payload.data;
          break;
        case "SET_DATA_PER_PAGE":
          state.coinHistoryDataPerPage = action.payload.data;
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
