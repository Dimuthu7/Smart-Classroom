import React from "react";
import DataTable from "react-data-table-component";

const Table = (props) => {
  return (
    <div>
      <DataTable
        title={props.title}
        columns={props.columns}
        theme="solarized"
        data={props.dataSet}
        highlightOnHover
        onRowClicked={(res) => props.fnRowClick ? props.fnRowClick(res) : null}
        data-tag="allowRowEvents"
        persistTableHead
        subHeader
        subHeaderWrap
        pagination
        fixedHeader={true}
        fixedHeaderScrollHeight={ props.strHeight || "400px"}
      />
    </div>
  )
}

export default Table;
