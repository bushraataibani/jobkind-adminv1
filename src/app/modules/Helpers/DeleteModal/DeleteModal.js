import { useTheme } from "@mui/material";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import BootstrapButton from "../UI/Button/BootstrapButton";

const DeleteModal = ({
  title,
  customTitle,
  selectedData,
  cancelHandler,
  deleteHandler,
  deleteButtonLabel = "Delete",
  deleteButtonLabelWhenSubmitting = "Deleting",
  customMessage,
  show,
  extraNote,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = () => {
    const prom = deleteHandler();

    if (prom) {
      setIsSubmitting(true);
      prom.finally(() => {
        cancelHandler();
        setIsSubmitting(false);
      });
    }
  };

  const theme = useTheme();

  return (
    <Modal
      backdrop="static"
      show={show}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: theme.palette.error.main }}
      >
        <Modal.Title
          id="example-modal-sizes-title-lg"
          style={{ color: "#fff" }}
        >
          {customTitle ? customTitle : title + " Delete"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span style={{ fontSize: "1.2rem" }}>
          {customMessage ? (
            customMessage
          ) : (
            <>
              Are you sure you want to permanently delete{" "}
              <span
                style={{
                  fontWeight: 600,
                  overflowWrap: "anywhere",
                }}
              >
                {selectedData}
              </span>{" "}
              {title}?
            </>
          )}

          {extraNote}
        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={cancelHandler}
          style={{ marginLeft: "10px" }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <BootstrapButton
          variant="danger"
          type="submit"
          label={deleteButtonLabel}
          labelWhenSubmitting={deleteButtonLabelWhenSubmitting}
          isSubmitting={isSubmitting}
          onClick={handleDelete}
          style={{ marginLeft: "10px" }}
          disabled={isSubmitting}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
