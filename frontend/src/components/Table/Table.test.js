import React from "react";
import { render, cleanup } from "@testing-library/react";
import Table from "./Table";
//import renderWithContext from "./utils/test";
afterEach(() => {
  cleanup();
});

test("renders Tracking Information", () => {
  const columns = [
    {
      Header: "Description",
      accessor: "description",
      sort: "ASC"
    },
    {
      Header: "Longitude",
      accessor: "longitude"
    }
  ];
  const data = [{ description: "test Data", longitude: 23424 }];
  const { getByTestId } = render(<Table columns={columns} data={data} />);
  const header = getByTestId(/reactTable/i);
  expect(header).toBeInTheDocument();
});
