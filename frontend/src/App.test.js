import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import App from "./App";
import renderWithContext from "./utils/test";

test("renders Tracking Information", () => {
  const { getByTestId } = render(<App />);
  const header = getByTestId(/trackingApp/i);
  expect(header).toBeInTheDocument();
});

test("Button opens tacking modal on Click", async () => {
  const { getByText, container, debug } = renderWithContext(<App />);
  const button = getByText(/Track Tracking/i);
  fireEvent.click(button);
  const movie = await waitForElement(() => getByText("Tracking Description"));
  expect(movie).toBeInTheDocument();
});
