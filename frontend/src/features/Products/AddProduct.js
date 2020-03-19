import React from "react";
import ProductsForm from "./ProductsForm";
import Modal from "../../components/Modal";
import { useProducts } from "./productContext";

const AddProduct = () => {
  const {
    state: { show },
    actions
  } = useProducts();
  return (
    <Modal
      open={show}
      buttonName="Track Product"
      openModal={actions.openModal}
      closeModal={actions.closeModal}
      header="Track Product"
    >
      <ProductsForm
        handleClose={actions.closeModal}
        handleAdd={actions.addTracking}
      />
    </Modal>
  );
};

export default AddProduct;
