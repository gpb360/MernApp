import React from "react";
import { createStore, applyMiddleware } from "redux";
import { useProducts, ProductsProvider } from "./productContext";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rootReducer } from "rootReducer";

function renderWithContext(node, { value, ...options }) {
  return render(
    <ProductsProvider value={value}>{node}</ProductsProvider>,
    options
  );
}

export default renderWithContext;
