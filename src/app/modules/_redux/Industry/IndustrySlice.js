import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allIndustry: [],
  selectedIndustry: null,
  page: 1,
  filter: {},
  dataCount: 0,
  dataPerPage: 10,
  sort: {
    name: "ASC",
  },
};

export const IndustrySlice = createSlice({
  name: "industry",
  initialState: initialState,
  reducers: {
    setAllIndustry: (state, action) => {
      state.allIndustry = action.payload;
    },
    industryFetched: (state, action) => {
      state.selectedIndustry = action.payload;
    },
    removeselectedIndustry: (state) => {
      state.selectedIndustry = null;
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
