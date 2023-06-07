import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EmailIcon from "@mui/icons-material/Email";
import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import noPhoto from "../../../../../../assets/no-photo.webp";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";

const UserDetails = ({ showUserModal, setShowUserModal, selectedRow }) => {
  let data = selectedRow?.user?.data;
  return (
    <Dialog
      open={showUserModal}
      scroll={"paper"}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogCloseTitle onClose={() => setShowUserModal(false)}>
        <Box
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          User
        </Box>
      </DialogCloseTitle>
      <DialogContent dividers>
        {/* <Card
          style={{
            "&:hover": {
              opacity: 1,
            },
            backgroundColor: "#f9f8f8",
            boxShadow: "2px 5px 7px 0.3px #d9dade",
            overflow: "auto",
            cursor: "pointer",
          }}
        > */}
        {/* <CardContent style={{ padding: "0px 16px" }}> */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            gap: "20px",
            padding: "10px 0px",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <AvatarGroup
              max={3}
              sx={{
                "& .MuiAvatar-root": {
                  width: 50,
                  height: 50,
                  fontSize: 9,
                  backgroundColor: "gray",
                },
              }}
            >
              <Avatar alt={noPhoto} src={data?.profile_image} />
            </AvatarGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              flexWrap: "wrap",
            }}
          >
            {(data?.first_name || data?.last_name) && (
              <Typography variant="h6" style={{ fontWeight: "500" }}>
                {data?.first_name} {data?.last_name}
              </Typography>
            )}

            {selectedRow?.company_name?.data && (
              <Typography variant="h7" style={{ fontWeight: "500" }}>
                {selectedRow?.company_name?.data}
              </Typography>
            )}

            {data?.address && (
              <Typography
                variant="h7"
                style={{
                  fontWeight: "400",
                  color: "#686868",
                  fontSize: "12px",
                }}
              >
                {data?.address}
              </Typography>
            )}

            {data?.phone_number && (
              <Typography
                variant="h7"
                style={{
                  fontWeight: "400",
                  color: "#686868",
                  fontSize: "12px",
                }}
              >
                {data?.phone_number}
              </Typography>
            )}
          </Box>
        </span>
        <span
          component="span"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-center",
            gap: "20px",
            padding: "10px 0px",
            flexWrap: "wrap",
          }}
        >
          {data?.email && (
            <Typography variant="h5" style={{ fontWeight: "600" }}>
              <Chip icon={<EmailIcon />} label={data?.email} />
            </Typography>
          )}
          {data?.total_coin && (
            <>
              <Typography variant="h5" style={{ fontWeight: "600" }}>
                <Chip
                  icon={<CurrencyRupeeIcon />}
                  label={data?.total_coin || "-"}
                />
              </Typography>
            </>
          )}
        </span>
        {/* </CardContent> */}

        {/* {data?.created_datetime && (
          <>
            <Divider />
            <CardActions
              style={{
                justifyContent: "flex-end",
                padding: "10px 16px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography
                variant="h7"
                style={{
                  fontWeight: "400",
                  color: "#686868",
                  fontSize: "12px",
                }}
              >
                {moment(
                  new Date(data?.created_datetime).toISOString(),
                  "YYYYMMDD"
                ).fromNow() || "-"}
              </Typography>
            </CardActions>
          </>
        )} */}
        {/* </Card> */}
      </DialogContent>
      <DialogActions>
        <Button variant="secondary" onClick={() => setShowUserModal(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetails;
