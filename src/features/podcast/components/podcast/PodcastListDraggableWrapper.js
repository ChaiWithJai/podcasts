import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import PodcastList from "./PodcastList";

export const PodcastListDraggableWrapper = ({ podcasts, droppableId }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(podcasts);
  }, [podcasts]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => {
          return (
            <article
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`list ${snapshot.isDraggingOver ? "active" : ""}`}
            >
              <PodcastList list={list} />
              {provided.placeholder}
            </article>
          );
        }}
      </Droppable>
    </div>
  );
};
