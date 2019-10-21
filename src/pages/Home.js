import React from "react";
import { ReactiveList } from "@appbaseio/reactivesearch";
import { ReactiveGoogleMap } from "@appbaseio/reactivemaps";
import ReactCountryFlag from "react-country-flag";
import countries from "../utils/country";
import SecondaryNav from "../components/SecondaryNav";

const { ResultListWrapper } = ReactiveList;

const Home = () => {
  const [map, showMap] = React.useState(false);
  return (
    <React.Fragment>
      <SecondaryNav />
      <div className={`map-container ${map ? "show-map" : ""}`}>
        <ReactiveGoogleMap
          defaultMapStyle="Light Monochrome"
          componentId="map"
          react={{ and: ["year", "country", "category"] }}
          dataField="location"
          size={50}
          showMarkerClusters={true}
          showSearchAsMove={false}
          defaultPin="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_quality-32.png"
          defaultZoom={2}
          renderAllData={(hits, _, loadMore, renderMap) => {
            return (
              <React.Fragment>
                <div className="results">
                  <ResultListWrapper>
                    {hits.map(item => {
                      const cn = countries.find(
                        ({ country }) =>
                          country.toLowerCase() ===
                            item.birth_country.toLowerCase() ||
                          country
                            .toLowerCase()
                            .includes(item.birth_country.toLowerCase()) ||
                          item.birth_country
                            .toLowerCase()
                            .includes(country.toLowerCase())
                      );
                      return (
                        <div key={item._id} className="card">
                          <h2>{item.full_name}</h2>
                          <div className="category">{item.category}</div>
                          <div className="info">
                            <div>
                              <h2>Country</h2>
                              <p>
                                {item.birth_country}
                                {cn ? (
                                  <ReactCountryFlag
                                    code={cn.abbreviation.toLowerCase()}
                                  />
                                ) : null}
                              </p>
                            </div>
                            <div>
                              <h2>Prize Year</h2>
                              <p>{item.prize_year}</p>
                            </div>
                            <div>
                              <h2>Age at the time of Award</h2>
                              <p>
                                {item.prize_year -
                                  item.birth_date.split("-")[0]}
                              </p>
                            </div>
                            {item.organization_name === "NA" || (
                              <div>
                                <h2>Organization</h2>
                                <p>{item.organization_name}</p>
                              </div>
                            )}
                          </div>
                          <div className="show-hover">
                            <button
                              className="know-more-btn"
                              type="button"
                              onClick={() =>
                                window.open(
                                  `https://google.com/search?q=${
                                    item.full_name
                                  }`,
                                  "_blank"
                                )
                              }
                            >
                              Know More
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </ResultListWrapper>
                  {hits && hits.length ? (
                    <button
                      type="button"
                      className="load-btn"
                      onClick={loadMore}
                    >
                      Click to Load More
                    </button>
                  ) : null}
                </div>
                <div className="map">{renderMap()}</div>
              </React.Fragment>
            );
          }}
          onPopoverClick={result => {
            const cn = countries.find(
              ({ country }) =>
                country.toLowerCase() === result.birth_country.toLowerCase() ||
                country
                  .toLowerCase()
                  .includes(result.birth_country.toLowerCase()) ||
                result.birth_country
                  .toLowerCase()
                  .includes(country.toLowerCase())
            );
            return (
              <div className="card popover">
                <h2>{result.full_name}</h2>
                <div className="category">{result.category}</div>
                <div className="flag">
                  {cn ? (
                    <ReactCountryFlag code={cn.abbreviation.toLowerCase()} />
                  ) : null}
                </div>
                <button
                  className="know-more-btn"
                  type="button"
                  onClick={() =>
                    window.open(
                      `https://google.com/search?q=${result.full_name}`,
                      "_blank"
                    )
                  }
                >
                  Know More
                </button>
              </div>
            );
          }}
        />
        <button
          className="map-switcher"
          type="button"
          onClick={() => showMap(!map)}
        >
          {map ? "Show Results" : "Show Map"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default Home;
