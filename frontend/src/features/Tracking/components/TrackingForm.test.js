import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import TrackingForm from "./TrackingForm";
import http from "../../../api";

test("renders Tracking Form Information", () => {
  const { getByTestId } = render(<TrackingForm />);
  const header = getByTestId(/trackingForm/i);
  expect(header).toBeInTheDocument();
});

test("handle submit Tacking form.", async () => {
  const { getByTestId, queryByTestId, debug, container } = render(
    <div data-testid="wrapper">
      <TrackingForm />
    </div>
  );
  http.get.mockResolvedValueOnce({
    data: 30
  });
  http.post.mockResolvedValueOnce({
    data: null
  });
  const button = queryByTestId(/trackingSubmit/i);
  debug(container);
  await waitForElement(() => getByTestId("wrapper"));
  fireEvent.click(button);
  await waitForElement(() => getByTestId("wrapper"));
});
