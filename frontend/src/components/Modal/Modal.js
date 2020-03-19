import React from "react";
import { Modal as SemanticModal, Button, Icon } from "semantic-ui-react";

const Modal = ({
  children,
  buttonName,
  openModal,
  closeModal,
  header,
  open
}) => (
  <SemanticModal
    trigger={
      <Button
        floated="right"
        icon
        labelPosition="left"
        primary
        size="small"
        onClick={openModal}
        className="products-btn"
      >
        <Icon name="user" /> {buttonName}
      </Button>
    }
    open={open}
    onClose={closeModal}
    centered={false}
  >
    <SemanticModal.Header>{header}</SemanticModal.Header>
    <SemanticModal.Content>
      <SemanticModal.Description>{children}</SemanticModal.Description>
    </SemanticModal.Content>
  </SemanticModal>
);

export default Modal;
