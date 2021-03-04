import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import PodcastList from './PodcastList';

export const PodcastListDraggableWrapper = ({podcasts, droppableId}) => {
    const isDisplayingActiveSelections = droppableId === "right-list"
    return (<div
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
            <PodcastList list={podcasts} condition={isDisplayingActiveSelections} />
            {provided.placeholder}
          </article>
        );
      }}
    </Droppable>
  </div>)
};