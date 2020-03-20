import React from "react";
import TrackingForm from "./TrackingForm";
import Modal from "../../../components/Modal";
import { useTracking } from "../trackingContext";

const AddTracking = () => {
  const {
    state: { show },
    actions
  } = useTracking();
  return (
    <Modal
      open={show}
      buttonName="Add Tracking"
      openModal={actions.openModal}
      closeModal={actions.closeModal}
      header="Add Tracking"
    >
      <TrackingForm
        handleClose={actions.closeModal}
        handleAdd={actions.addTracking}
      />
    </Modal>
  );
};

export default AddTracking;
