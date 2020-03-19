import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders Tracking Information", () => {
  const { getByTestId } = render(<App />);
  const header = getByTestId(/trackingApp/i);
  expect(header).toBeInTheDocument();
});

test("renders Tracking Information", () => {
  const { getByText, debug, container } = render(<App />);
  const button = getByText(/Track Product/i);
  fireEvent.click(button);
  debug(container);
});
