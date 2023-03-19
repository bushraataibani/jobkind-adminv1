import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allSkill: [],
  selectedSkill: null,
  page: 1,
  filter: {},
  dataCount: 0,
  dataPerPage: 10,
  sort: {
    name: "ASC",
  },
};

export const SkillSlice = createSlice({
  name: "skill",
  initialState: initialState,
  reducers: {
    setAllSkill: (state, action) => {
      state.allSkill = action.payload;
    },
    skillFetched: (state, action) => {
      state.selectedSkill = action.payload;
    },
    removeselectedSkill: (state) => {
      state.selectedSkill = null;
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
