import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  getPodcasts,
  updatePodcast,
  selectAllPodcasts,
  selectSelectedPodcasts,
  selectPodcastStatus,
} from "./podcastSlice";
import { PodcastListDraggableWrapper } from "./components/podcast/PodcastListDraggableWrapper";
import "./podcast.css";

const PodcastContainer = () => {
  const podcasts = useSelector(selectAllPodcasts);
  const podcastStatus = useSelector(selectPodcastStatus);
  const selectedPodcasts = useSelector(selectSelectedPodcasts);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(selectedPodcasts);

  useEffect(() => {
    if (podcastStatus === "idle") dispatch(getPodcasts());
  }, [podcastStatus, dispatch]);

  const handleDrag = ({ source, destination, draggableId }) => {
    if (!destination) return;
    const isInSelectedList = selected.find(
      (podcast) => podcast.title === draggableId
    );

    let selectedPodcast;
    if (source.droppableId !== destination.droppableId) {
      selectedPodcast = podcasts.find(
        (podcast) => podcast.title === draggableId
      );
      if (selectedPodcast === -1) {
        setSelected([
          ...selected.filter((p) => p.title !== selectedPodcast.title),
        ]);
      } else {
        setSelected([...selected, selectedPodcast]);
      }
      dispatch(updatePodcast(selectedPodcast));
    } else if (
      source.droppableId === destination.droppableId &&
      isInSelectedList
    ) {
      const selectedCopy = Array.from(selected);
      const [movedPodcast] = selectedCopy.splice(source.index, 1);
      selectedCopy.splice(destination.index, 0, movedPodcast);
      setSelected(selectedCopy);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext onDragEnd={(result) => handleDrag(result)}>
        <PodcastListDraggableWrapper
          podcasts={podcasts}
          droppableId="left-list"
        />
        <PodcastListDraggableWrapper
          podcasts={selected}
          droppableId="right-list"
        />
      </DragDropContext>
    </div>
  );
};

export default PodcastContainer;
