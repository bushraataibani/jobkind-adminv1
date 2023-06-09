import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import CandidateMgtViewForm from "./CandidateMgtViewForm";

const CandidateMgtView = ({ show, id, onHide }) => {
  const { selectedCandidateMgt } = useSelector(
    (state) => ({
      selectedCandidateMgt: state.candidateMgt.selectedCandidateMgt,
      filter: state.candidateMgt.filter,
      page: state.candidateMgt.page,
      dataPerPage: state.candidateMgt.dataPerPage,
    }),
    shallowEqual
  );

  const saveCandidateMgt = (data) => {
    // dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    // return addCandidateMgtToServer(dataToServer).then(() => {
    //   dispatch(
    //     generalActions.pushNewAlert({
    //       show: true,
    //       heading: "Success",
    //       message: successMessage("SEO", "updated"),
    //       type: "success",
    //     })
    //   );
    //   dispatch(actions.setLoading(true));
    //   getAllCandidateMgt({
    //     search: filter?.search?.keyword ? filter?.search?.keyword : "",
    //     page_no: page,
    //     page_record: dataPerPage,
    //   })
    //     .then((res) => {
    //       dispatch(
    //         actions.setAllCandidateMgt(res?.data?.data?.candidateMgt_data?.rows)
    //       );
    //     })
    //     .catch((error) => console.error(error))
    //     .finally(() => {
    //       dispatch(
    //         actions.setPageConfigData({
    //           type: "SET_IS_LOADING",
    //           data: false,
    //         })
    //       );
    //     });
    // });
  };

  return (
    <>
      {selectedCandidateMgt && show && (
        <CandidateMgtViewForm
          show={show}
          onHide={onHide}
          saveCandidateMgt={saveCandidateMgt}
          selectedCandidateMgt={selectedCandidateMgt}
        />
      )}
    </>
  );
};

export default CandidateMgtView;
