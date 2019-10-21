import React from "react";
import {
  MultiDropdownList,
  DynamicRangeSlider
} from "@appbaseio/reactivesearch";

const SecondaryNav = () => {
  return (
    <nav className="secondary">
      <MultiDropdownList
        dataField="birth_country.keyword"
        placeholder="Country"
        showSearch
        componentId="country"
        URLParams
      />
      <MultiDropdownList
        dataField="category.keyword"
        placeholder="Category"
        showSearch
        componentId="category"
        react={{
          and: ["country", "prize_year"]
        }}
      />

      <DynamicRangeSlider
        dataField="prize_year"
        showHistogram={false}
        tooltipTrigger="hover"
        className="slider"
        rangeLabels={(start, end) => ({
          start: start,
          end: end
        })}
        componentId="year"
        react={{
          and: ["country", "category"]
        }}
      />
    </nav>
  );
};

export default SecondaryNav;
