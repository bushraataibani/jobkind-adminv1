import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import * as auth from "../app/modules/Auth/_redux/authRedux";
import { CollegeSlice } from "../app/modules/_redux/College/CollegeSlice";
import { generalSlice } from "../app/modules/_redux/general/generalSlice";

export const rootReducer = combineReducers({
  general: generalSlice.reducer,
  auth: auth.reducer,
  college: CollegeSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
