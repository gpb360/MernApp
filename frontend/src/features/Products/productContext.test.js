import React from "react";

import { render, cleanup, act } from "@testing-library/react";
import { useProducts, ProductsProvider } from "./productContext";
export const ProductsContext = React.createContext();
import "mutationobserver-shim";
const Products = ({ children, ...rest }) => children(useProducts(rest));

function setup(props) {
  const returnVal = {};
  render(
    <ProductsProvider>
      <Products {...props}>
        {val => {
          Object.assign(returnVal, val);
          return null;
        }}
      </Products>
    </ProductsProvider>
  );
  return returnVal;
}

afterEach(cleanup);

test("useProducts inititial state", () => {
  const defaults = setup();
  expect(defaults).toHaveProperty("state.products", []);
  expect(defaults).toHaveProperty("state.isLoading", false);
  expect(defaults).toHaveProperty("state.show", false);
});

test("useProducts load Tracking", () => {
  const defaults = setup();
  act(() => {
    defaults.actions.loadProducts([{ id: 1 }]);
  });
  expect(defaults).toHaveProperty("state.products", [{ id: 1 }]);
});

test("useProducts Add Tracking", () => {
  const defaults = setup();
  act(() => {
    defaults.actions.addTracking({ id: 1 });
  });
  expect(defaults).toHaveProperty("state.products", [{ id: 1 }]);
});
