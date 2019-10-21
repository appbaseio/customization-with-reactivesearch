import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ReactiveList } from "@appbaseio/reactivesearch";
import List from "../components/List";
import { reorderMap } from "../utils";

class Interaction extends React.Component {
  constructor() {
    super();

    this.state = {
      resultsMap: { organic: [], promoted: [] },
      organicLoading: true,
      promotedLoading: true
    };
  }

  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    this.setState(
      reorderMap({
        resultsMap: this.state.resultsMap,
        source,
        destination
      })
    );
  };

  render() {
    const {
      resultsMap: { organic, promoted },
      organicLoading,
      promotedLoading
    } = this.state;
    return (
      <React.Fragment>
        <ReactiveList
          componentId="result-drag"
          defaultQuery={() => ({
            query: {
              term: {
                promoted: "0"
              }
            }
          })}
          style={{ display: "none" }}
          dataField="_score"
          pagination={false}
          onData={({ data }) =>
            this.setState(state => ({
              organicLoading: false,
              resultsMap: {
                ...state.resultsMap,
                organic: data
              }
            }))
          }
          render={() => null}
        />
        <ReactiveList
          componentId="result-promoted-drag"
          defaultQuery={() => ({
            query: {
              term: {
                promoted: "1"
              }
            }
          })}
          style={{ display: "none" }}
          dataField="_score"
          pagination={false}
          onData={({ data }) =>
            this.setState(state => ({
              promotedLoading: false,
              resultsMap: {
                ...state.resultsMap,
                promoted: data
              }
            }))
          }
          render={() => null}
        />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="vertical-lists">
            <div>
              {organicLoading ? (
                <p className="result-loading">Loading Organic Results...</p>
              ) : (
                <List
                  title="Organic Results"
                  listId="organic"
                  results={organic}
                />
              )}
            </div>
            <div className="promoted">
              {promotedLoading ? (
                <p className="result-loading">Loading Promoted Results...</p>
              ) : (
                <List
                  title="Promoted Results"
                  listId="promoted"
                  results={promoted}
                />
              )}
            </div>
          </div>
        </DragDropContext>
      </React.Fragment>
    );
  }
}

export default Interaction;
