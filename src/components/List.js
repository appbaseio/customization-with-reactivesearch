import React from "react";
import ReactCountryFlag from "react-country-flag";

import { Droppable, Draggable } from "react-beautiful-dnd";
import countries from "../utils/country";

const ResultItem = props => {
  const { result, isDragging, isGroupedOver, provided } = props;
  const cn = countries.find(
    ({ country }) =>
      country.toLowerCase() === result.birth_country.toLowerCase() ||
      country.toLowerCase().includes(result.birth_country.toLowerCase()) ||
      result.birth_country.toLowerCase().includes(country.toLowerCase())
  );
  return (
    <div
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`card ${isDragging ? "active-drag" : ""}`}
    >
      <h2>{result.full_name}</h2>
      <div className="category">{result.category}</div>
      <div className="flag">
        {cn ? <ReactCountryFlag code={cn.abbreviation.toLowerCase()} /> : null}
      </div>
    </div>
  );
};

const InnerResultList = React.memo(function InnerQuoteList(props) {
  return props.results.map((item, index) => (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <ResultItem
          key={item._id}
          result={item}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
});

function InnerList(props) {
  const { results, dropProvided } = props;
  const title = props.title ? <h6>{props.title}</h6> : null;

  return (
    <div>
      {title}
      <div className="drop-area" ref={dropProvided.innerRef}>
        <InnerResultList results={results} />
        {dropProvided.placeholder}
      </div>
    </div>
  );
}

export default function List(props) {
  const { listId = "LIST", results, title } = props;

  return (
    <Droppable droppableId={listId}>
      {(dropProvided, dropSnapshot) => (
        <div
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          <InnerList
            results={results}
            title={title}
            dropProvided={dropProvided}
          />
        </div>
      )}
    </Droppable>
  );
}
