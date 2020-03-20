import React from "react";
import { Input, Icon } from "semantic-ui-react";

const TableFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div>
      <Input icon fluid placeholder="Search">
        <input
          data-testid="tableFilter"
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
};

export default TableFilter;
