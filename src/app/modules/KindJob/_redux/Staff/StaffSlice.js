import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allStaff: [],
  selectedStaff: null,
  page: 0,
  filter: {},
  dataCount: 0,
  dataPerPage: 10,
  sort: {
    name: "ASC",
  },
};

export const StaffSlice = createSlice({
  name: "staff",
  initialState: initialState,
  reducers: {
    setAllStaff: (state, action) => {
      state.allStaff = action.payload;
    },
    staffFetched: (state, action) => {
      state.selectedStaff = action.payload;
    },
    removeSelectedStaff: (state) => {
      state.selectedStaff = null;
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
