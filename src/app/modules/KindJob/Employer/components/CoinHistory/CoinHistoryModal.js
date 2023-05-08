import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import EmployerTableConfig from "../../EmployerTableConfig";
import AddCoinModal from "../../modules/EmployerJob/AddCoinModal";

const CoinHistoryModal = ({ showCoinModal, setShowCoinModal }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rowData, setRowData] = useState([]);

  const {
    coinHistoryPage,
    coinHistoryDataCount,
    coinHistoryDataPerPage,
    empCoinHistory,
  } = useSelector(
    (state) => ({
      coinHistoryPage: state.employer.coinHistoryPage,
      coinHistoryDataCount: state.employer.coinHistoryDataCount,
      coinHistoryDataPerPage: state.employer.coinHistoryDataPerPage,
      empCoinHistory: state.employer.empCoinHistory,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = empCoinHistory?.map((coin, i) =>
      EmployerTableConfig.getFormattedEmployerCoinHistory(coin, i)
    );

    setRowData(data);
  }, [empCoinHistory]);

  return (
    <>
      <Dialog
        open={showCoinModal}
        scroll={"paper"}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogCloseTitle
          onClose={() => setShowCoinModal(false)}
          isCloseButtonDisabled={isSubmitting}
        >
          <Box
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Coin History
          </Box>
        </DialogCloseTitle>
        <DialogContent dividers>
          <AddCoinModal
            setIsSubmitting={setIsSubmitting}
            isSubmitting={isSubmitting}
          />
          <TableCustomServer
            page={coinHistoryPage}
            dataCount={coinHistoryDataCount}
            dataPerPage={coinHistoryDataPerPage}
            rowData={rowData !== undefined ? rowData : []}
            columnsConfig={EmployerTableConfig?.employerCoinHistoryColumns}
            numCols={EmployerTableConfig?.employerCoinHistoryColumns?.length}
            showPagination={true}
            showViewButton={false}
            showDeleteButton={false}
            handleSetPage={(newPage) => {
              dispatch(
                actions.setCoinHistoryPageConfigData({
                  type: "SET_PAGE",
                  data: newPage,
                })
              );
            }}
            handleNoOfRowsPerPage={(value) => {
              dispatch(
                actions.setCoinHistoryPageConfigData({
                  type: "SET_DATA_PER_PAGE",
                  data: parseInt(value, 10),
                })
              );
              dispatch(
                actions.setCoinHistoryPageConfigData({
                  type: "SET_PAGE",
                  data: 0,
                })
              );
            }}
          />
        </DialogContent>
        <DialogActions>
          <BootstrapButton
            variant="secondary"
            onClick={() => setShowCoinModal(false)}
            disabled={isSubmitting}
          >
            Cancel
          </BootstrapButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CoinHistoryModal;
