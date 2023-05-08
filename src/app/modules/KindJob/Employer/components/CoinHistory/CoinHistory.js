/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getEmployerCoinHistory } from "../../../_redux/Employer/EmployerCrud";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import CoinHistoryModal from "./CoinHistoryModal";

const CoinHistory = ({ showCoinModal, setShowCoinModal }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const {
    selectedEmployer,
    coinHistoryPage,
    coinHistoryDataPerPage,
  } = useSelector(
    (state) => ({
      selectedEmployer: state.employer.selectedEmployer,
      coinHistoryPage: state.employer.coinHistoryPage,
      coinHistoryDataPerPage: state.employer.coinHistoryDataPerPage,
    }),
    shallowEqual
  );

  const getEmployerCoinHistoryDetails = (user_id) => {
    dispatch(actions.setLoading(true));
    return getEmployerCoinHistory({
      search: "",
      page_no: coinHistoryPage,
      page_record: coinHistoryDataPerPage,
      user_id: user_id,
    })
      .then((res) => {
        dispatch(
          actions.setEmpCoinHistory(res?.data?.data?.coin_transaction?.rows)
        );
        dispatch(
          actions.setCoinHistoryPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.coin_transaction?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(actions.setLoading(false));
        dispatch(
          actions.setCoinHistoryPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  useEffect(() => {
    getEmployerCoinHistoryDetails(
      selectedEmployer && selectedEmployer.user_id.data
    );
  }, [coinHistoryPage, coinHistoryDataPerPage]);

  return (
    showCoinModal && (
      <CoinHistoryModal
        showCoinModal={showCoinModal}
        setShowCoinModal={setShowCoinModal}
      />
    )
  );
};

export default CoinHistory;
