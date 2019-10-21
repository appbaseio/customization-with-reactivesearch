import React from "react";
import { ReactiveList } from "@appbaseio/reactivesearch";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ReactCountryFlag from "react-country-flag";
import countries from "../utils/country";

const FlagRender = props => {
  const { value } = props;
  const item = countries.find(
    ({ country }) =>
      country.toLowerCase() === value.toLowerCase() ||
      country.toLowerCase().includes(value.toLowerCase()) ||
      value.toLowerCase().includes(country.toLowerCase())
  );
  if (item) {
    return (
      <span>
        <ReactCountryFlag code={item.abbreviation.toLowerCase()} />
        {value}
      </span>
    );
  }
  return value;
};

const AgTable = () => {
  return (
    <ReactiveList
      componentId="ag_table"
      dataField="_score"
      pagination
      react={{
        and: ["country-pie", "category-pie"]
      }}
      showResultStats={false}
      scrollOnChange={false}
      className="ag-theme-balham ag-table"
      render={({ data }) => {
        return (
          <AgGridReact
            suppressMenuHide
            icons={{
              menu: '<i class="fa fa-filter" />'
            }}
            columnDefs={[
              {
                headerName: "Personal Details",
                children: [
                  {
                    headerName: "Name",
                    field: "full_name"
                  },
                  {
                    headerName: "Birth Date",
                    field: "birth_date"
                  },
                  {
                    headerName: "Birth City",
                    field: "birth_city",
                    columnGroupShow: "open"
                  },
                  {
                    headerName: "Birth Country",
                    field: "birth_country",
                    columnGroupShow: "open",
                    cellRenderer: "flagRenderer"
                  }
                ]
              },
              {
                headerName: "Nobel Prize Details",
                children: [
                  {
                    headerName: "Prize Year",
                    field: "prize_year",
                    sortable: true,
                    filter: true
                  },
                  {
                    headerName: "Category",
                    field: "category",
                    sortable: true,
                    filter: true
                  }
                ]
              },
              {
                headerName: "Organization Details",
                children: [
                  { headerName: "Name", field: "organization_name" },
                  {
                    headerName: "City",
                    field: "organization_city",
                    columnGroupShow: "open"
                  },
                  {
                    headerName: "Country",
                    field: "organization_country",
                    columnGroupShow: "open",
                    cellRenderer: "flagRenderer"
                  }
                ]
              }
            ]}
            frameworkComponents={{
              flagRenderer: FlagRender
            }}
            rowData={data}
          />
        );
      }}
      size={25}
    />
  );
};

export default AgTable;
