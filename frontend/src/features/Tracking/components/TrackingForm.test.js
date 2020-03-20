import React from "react";
import { render } from "@testing-library/react";
import TrackingForm from "./TrackingForm";

test("renders Tracking Information", () => {
  const { getByTestId } = render(<TrackingForm />);
  const header = getByTestId(/trackingForm/i);
  expect(header).toBeInTheDocument();
});
