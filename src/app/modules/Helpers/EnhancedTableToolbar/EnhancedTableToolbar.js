import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDebouncyEffect } from "use-debouncy";

const EnhancedTableToolbar = ({
  title,
  tooltipTitle,
  btnTitle,
  circularLoader,
  btnHandler,
  refreshWhenWholeFilterChange = false,
  filter,
  refreshHandler,
  showExtraBtn = false,
  renderBeforeSearch,
  showbackBtn = true,
  showAdd = true,
  showReload = true,
  showTopMessage = false,
  topMessage,
  showSearch = false,
  shouldGetDataOnSearchInput = true,
  showHelpMenu = false,
  tooltipHelp = "",
  backgroundStyle,
  helpContent,
  searchConfig: { searchKeys = [], filterValue = "", setSearchConfig } = {},
  extraBtnHandler,
  showOrgNextPrev,
  selectPrevMatch,
  selectNextMatch,
  searchFocusIndex,
  searchFoundCount,
}) => {
  const history = useHistory();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openHelpMenu = Boolean(anchorEl);
  const id = openHelpMenu ? "simple-popover-" + title : undefined;

  useDebouncyEffect(
    () => (shouldGetDataOnSearchInput ? refreshHandler() : undefined),
    800,
    [refreshWhenWholeFilterChange ? filter : filterValue]
  );

  const changeFilterHandler = (value) => {
    const dataFilter = {
      search: {
        keys: searchKeys,
        keyword: value,
      },
    };
    setSearchConfig(dataFilter);
  };

  return (
    <>
      {Boolean(showTopMessage) && topMessage}

      <Toolbar
        sx={{
          padding: "0px !important",
          border: "0px !important",
          background: backgroundStyle && "#fff",
          display: "flex",
          alignItems: "center",
          marginRight: "auto",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {Boolean(showbackBtn) && (
            <Box
              onClick={() => history.goBack()}
              sx={{
                padding: "0px 10px",
                fontSize: "1.4rem",
                cursor: "pointer",
              }}
            >
              <i className="fas fa-arrow-left" style={{ color: "#000" }}></i>
            </Box>
          )}
          <Typography
            sx={{
              fontWeight: 600,
              flex: "1 1 100%",
              fontSize: "1.4rem",
              display: "flex",
              alignItems: "center",
            }}
            variant="h6"
            id="tableTitle"
            component="div"
            noWrap={true}
          >
            <span>{title} </span>
            {Boolean(showHelpMenu) && (
              <Tooltip disableInteractive={true} arrow title={tooltipHelp}>
                <IconButton
                  sx={{ padding: "2px" }}
                  disableRipple
                  onClick={handleClick}
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            )}
            {circularLoader}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Box>{renderBeforeSearch}</Box>

          <Box>
            {Boolean(showSearch) && (
              <TextField
                fullWidth={true}
                sx={{
                  "& legend": {
                    width: "0px",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: filterValue && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => changeFilterHandler("")}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  autoComplete: "off",
                }}
                inputProps={{
                  style: {
                    padding: "10px 14px",
                  },
                }}
                value={filterValue}
                variant="outlined"
                onChange={(e) => {
                  const { value } = e.target;
                  changeFilterHandler(value);
                }}
                name="searchText"
                placeholder="Search"
              />
            )}
          </Box>

          <Box>
            {showExtraBtn && (
              <Tooltip disableInteractive={true} arrow title="Candidate List">
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    backgroundColor: theme.palette.warning.main,
                    color: "#fff",
                    minWidth: "auto",
                  }}
                  onClick={extraBtnHandler}
                  startIcon={<AccountBoxIcon />}
                >
                  Candidate
                </Button>
              </Tooltip>
            )}
          </Box>

          <Box>
            {Boolean(showReload) && (
              <Tooltip disableInteractive={true} arrow title="Fetch New Data">
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    minWidth: "auto",
                  }}
                  onClick={refreshHandler}
                  startIcon={<CachedIcon />}
                >
                  Reload
                </Button>
              </Tooltip>
            )}
          </Box>

          <Box>
            {Boolean(showAdd) && (
              <Tooltip disableInteractive={true} arrow title={tooltipTitle}>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  style={{
                    color: "#fff",
                    minWidth: "auto",
                  }}
                  onClick={btnHandler}
                  startIcon={<AddIcon />}
                >
                  {btnTitle}
                </Button>
              </Tooltip>
            )}
          </Box>

          <Box>
            {Boolean(showHelpMenu) && (
              <Popover
                id={id}
                open={openHelpMenu}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {helpContent}
              </Popover>
            )}
          </Box>
        </Box>
      </Toolbar>
    </>
  );
};

export default EnhancedTableToolbar;
