const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;

export const reorderMap = ({ resultsMap, source, destination }) => {
  const current = [...resultsMap[source.droppableId]];
  const next = [...resultsMap[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...resultsMap,
      [source.droppableId]: reordered
    };
    return {
      resultsMap: result
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...resultsMap,
    [source.droppableId]: current,
    [destination.droppableId]: next
  };
  console.log(result);

  return {
    resultsMap: result
  };
};
