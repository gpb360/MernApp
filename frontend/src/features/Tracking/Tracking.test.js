import React from "react";
import Tracking from "./Tracking";
import { waitForElement, cleanup } from "@testing-library/react";
import renderWithContext from "../../utils/test";
import http from "../../api";

const mockresponse = [
  {
    id: "1",
    description: "Cesna 120",
    datetime: "2016-10-12T12:00:00-05:00",
    longitude: "43.2583264",
    latitude: "-81.8149807",
    elevation: "500"
  },
  {
    id: "1",
    description: "Cesna 120",
    datetime: "2016-10-13T12:00:00-05:00",
    longitude: "42.559112",
    latitude: "-79.286693",
    elevation: "550"
  }
];

afterEach(() => {
  cleanup();
});

test("renders Tracking Information", async () => {
  const { getByText } = renderWithContext(<Tracking />);
  http.get.mockResolvedValue({
    data: mockresponse
  });
  const header = getByText(/Tracking/i);
  await waitForElement(async () => header);
  expect(header).toBeInTheDocument();
});
