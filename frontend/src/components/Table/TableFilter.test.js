import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TableFilter from "./TableFilter";

test("renders Table Filter", () => {
  const globalFilter = "test";
  const setGlobalFilter = jest.fn();
  const { getByTestId, debug } = render(
    <TableFilter
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
  const input = getByTestId(/tableFilter/i);
  fireEvent.change(input, { target: { value: "setGlobal" } });
  expect(setGlobalFilter).toHaveBeenCalled();
});
