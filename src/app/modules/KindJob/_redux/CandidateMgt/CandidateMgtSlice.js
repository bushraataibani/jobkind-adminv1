import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  allCandidateMgt: [],
  selectedCandidateMgt: null,
  page: 0,
  filter: {},
  dataCount: 0,
  dataPerPage: 10,
  sort: {
    name: "ASC",
  },
  fileProgress: 0,
};

export const CandidateMgtSlice = createSlice({
  name: "candidateMgt",
  initialState: initialState,
  reducers: {
    setFileProgress: (state, action) => {
      state.fileProgress = action.payload;
    },
    setAllCandidateMgt: (state, action) => {
      state.allCandidateMgt = action.payload;
    },
    candidateMgtFetched: (state, action) => {
      state.selectedCandidateMgt = action.payload;
    },
    removeSelectedCandidateMgt: (state) => {
      state.selectedCandidateMgt = null;
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
