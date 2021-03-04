import React from "react";
import { Draggable } from "react-beautiful-dnd";
import AudioPlayer from "../audio-player/AudioPlayer";

const PodcastRow = ({ podcast, id }) => {
  return (
    <Draggable key={podcast.title} draggableId={podcast.title} index={id}>
      {(provided) => {
        return (
            <div
              className="podcast-card"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <h1 className="podcast-title">{podcast.title}</h1>
              <h2 className="podcast-name">{podcast.name}</h2>
              <p className="podcast-description">{podcast.description}</p>
              <AudioPlayer
                podcast={podcast}
              />
            </div>
        );
      }}
    </Draggable>
  );
};

export default PodcastRow;
