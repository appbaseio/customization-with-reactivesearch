import React from "react";
import {
  SingleList,
  SelectedFilters,
  StateProvider
} from "@appbaseio/reactivesearch";

import AgTable from "../components/AgTable";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

const About = () => {
  const [country, setCountry] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  return (
    <div className="container">
      <SelectedFilters />
      <StateProvider
        includeKeys={["hits"]}
        render={({ searchState }) => {
          if (
            searchState &&
            searchState.ag_table &&
            searchState.ag_table.hits &&
            searchState.ag_table.hits.hits
          ) {
            return (
              <p className="stats">
                {searchState.ag_table.hits.total} results found in{" "}
                {searchState.ag_table.hits.time} ms
              </p>
            );
          }

          return null;
        }}
      />
      <div className="charts">
        <SingleList
          title="Awards By Countries"
          dataField="birth_country.keyword"
          componentId="country-pie"
          filterLabel="Country"
          className="chart-card"
          size={10}
          value={country}
          onChange={value => setCountry(value)}
          showSearch={false}
          render={({ data, loading }) => {
            if (loading) {
              return <div className="loader" />;
            }

            const prizes = data.map(item => ({
              country: item.key,
              prizes: item.doc_count
            }));
            return (
              <BarChart
                data={prizes}
                value={country}
                handleChange={setCountry}
              />
            );
          }}
        />
        <SingleList
          title="Awards By Categories"
          dataField="category.keyword"
          filterLabel="Category"
          componentId="category-pie"
          size={10}
          value={category}
          className="chart-card"
          onChange={value => setCategory(value)}
          showSearch={false}
          render={({ data, loading }) => {
            if (loading) {
              return <div className="loader" />;
            }
            const categories = data.map(item => ({
              name: item.key,
              prizes: item.doc_count
            }));
            return (
              <PieChart
                data={categories}
                value={category}
                handleChange={setCategory}
              />
            );
          }}
        />
      </div>
      <AgTable />
    </div>
  );
};

export default About;
