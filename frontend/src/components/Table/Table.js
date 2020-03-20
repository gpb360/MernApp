import React from "react";
import { Table as SemanticTable } from "semantic-ui-react";
import { useTable, useGlobalFilter } from "react-table";
import TableFilter from "./TableFilter";

import "./reacttable.styles.scss";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    state,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable({ columns, data }, useGlobalFilter);
  return (
    <>
      <TableFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <SemanticTable
        {...getTableProps()}
        className="react-table"
        data-testid="reactTable"
      >
        <SemanticTable.Header>
          <SemanticTable.Row>
            {columns.map((column, i) => (
              <SemanticTable.HeaderCell key={i}>
                {column.Header}
              </SemanticTable.HeaderCell>
            ))}
          </SemanticTable.Row>
        </SemanticTable.Header>
        <SemanticTable.Body>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <SemanticTable.Row
                className="react-table-row"
                {...row.getRowProps()}
              >
                {row.cells.map(cell => {
                  return (
                    <SemanticTable.Cell
                      className="react-table-cell"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </SemanticTable.Cell>
                  );
                })}
              </SemanticTable.Row>
            );
          })}
        </SemanticTable.Body>
      </SemanticTable>
    </>
  );
};

export default Table;
