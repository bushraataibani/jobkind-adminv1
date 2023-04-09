import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CustomAlert from "./modules/Helpers/Alert/CustomAlert";
import { generalSlice } from "./modules/KindJob/_redux/general/generalSlice";

const AllAlerts = (props) => {
  const dispatch = useDispatch();
  const { actions } = generalSlice;

  const { allAlerts } = useSelector(
    (state) => ({
      allAlerts: state.general.allAlerts,
    }),
    shallowEqual
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: 5,
        transform: "translateX(50%)",
        right: "50%",
        gap: "5px",
        zIndex: 1301,
        maxWidth: "800px",
      }}
    >
      {/* <TransitionGroup component={null}> */}
      {allAlerts?.map((alert, i, arr) => (
        // <CSSTransition key={alert.id} timeout={500} classNames="topalert">
        <CustomAlert
          {...alert}
          key={alert.id}
          isAbsolute={false}
          setShow={(id) => {
            dispatch(actions.deleteAlert(alert.id));
          }}
        />
        // </CSSTransition>
      ))}
      {/* </TransitionGroup> */}
    </div>
    // ,
    // document.getElementById("root")
  );
};

export default AllAlerts;
