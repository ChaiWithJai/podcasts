import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  getPodcasts,
  updatePodcast,
  selectAllPodcasts,
  selectPodcastStatus,
} from "./podcastSlice";
import { PodcastListDraggableWrapper } from "./components/podcast/PodcastListDraggableWrapper";
import "./podcast.css";

const PodcastContainer = () => {
  const podcasts = useSelector(selectAllPodcasts);
  const podcastStatus = useSelector(selectPodcastStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (podcastStatus === "idle") dispatch(getPodcasts());
  }, [podcastStatus, dispatch]);

  const handleDrag = ({ source, destination, draggableId }) => {
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const selectedPodcast = podcasts.find(
        (podcast) => podcast.title === draggableId
      );
      dispatch(updatePodcast(selectedPodcast));
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext onDragEnd={(result) => handleDrag(result)}>
        <PodcastListDraggableWrapper podcasts={podcasts} droppableId="left-list" />
        <PodcastListDraggableWrapper podcasts={podcasts} droppableId="right-list" />
      </DragDropContext>
    </div>
  );
};

export default PodcastContainer;
