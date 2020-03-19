import React from "react";
import { Table, Input, Icon } from "semantic-ui-react";
import { useTable, useGlobalFilter } from "react-table";
import "./reacttable.styles.scss";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div>
      <Input icon fluid placeholder="Search">
        <input
          value={globalFilter || ""}
          onChange={e => {
            setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
          }}
          placeholder={`Search...`}
        />
        <Icon name="search" />
      </Input>
    </div>
  );
}

const ReactTable = ({ columns, data }) => {
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
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table {...getTableProps()} className="react-table">
        <Table.Header>
          <Table.Row>
            {columns.map((column, i) => (
              <Table.HeaderCell key={i}>{column.Header}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Table.Row className="react-table-row" {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <Table.Cell
                      className="react-table-cell"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default ReactTable;
