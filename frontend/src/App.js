import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import Products from "./features/Products";
import AddProduct from "./features/Products/AddProduct";
import { ProductsProvider } from "./features/Products/productContext";
import "./app.styles.scss";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  return (
    <Container className="app" data-testid="trackingApp">
      <ProductsProvider>
        <AddProduct
          show={show}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <Products />
      </ProductsProvider>
    </Container>
  );
}

export default App;
