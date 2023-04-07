import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allEducation: [],
  selectedEducation: null,
  page: 0,
  filter: {},
  dataCount: 0,
  dataPerPage: 10,
  sort: {
    name: "ASC",
  },
};

export const EducationSlice = createSlice({
  name: "education",
  initialState: initialState,
  reducers: {
    setAllEducation: (state, action) => {
      state.allEducation = action.payload;
    },
    educationFetched: (state, action) => {
      state.selectedEducation = action.payload;
    },
    removeSelectedEducation: (state) => {
      state.selectedEducation = null;
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
