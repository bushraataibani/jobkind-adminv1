import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";

const timeouttime = 4000;

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const Message = styled("div")(({ theme, ...rest }) => ({
  fontSize: "1.1rem",
}));

const CustomAlert = ({
  show,
  setShow,
  type,
  heading,
  message,
  myMessage = null,
  errMessage = null,
  errDescription = null,
  id,
  styles,
  isAbsolute = true,
}) => {
  useEffect(() => {
    const c = setTimeout(() => {
      setShow(id);
    }, timeouttime);
    return () => {
      clearTimeout(c);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Snackbar
      open={show}
      ClickAwayListenerProps={{ mouseEvent: false }}
      // autoHideDuration={timeouttime}
      TransitionComponent={TransitionDown}
      // onClose={() => setShow(id)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        position: !isAbsolute && "relative",
      }}
    >
      <Alert
        severity={type === "danger" ? "error" : "success"}
        onClose={() => {
          // setchecked(false);
          setShow(id);
        }}
        variant="filled"
      >
        <AlertTitle sx={{ fontSize: "1.3rem" }}>{heading}</AlertTitle>

        {myMessage ? (
          <Message>{myMessage}</Message>
        ) : (
          <Message>{message}</Message>
        )}

        {errMessage && typeof errMessage === "string" && (
          <Message>{errMessage}</Message>
        )}
        {errDescription && typeof errDescription === "string" && (
          <Message>{errDescription}</Message>
        )}
      </Alert>
    </Snackbar>
  );
};
export default CustomAlert;
