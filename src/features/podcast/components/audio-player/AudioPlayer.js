import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Play from "./Play";
import Pause from "./Pause";

import {
  selectCurrentlyPlaying,
  selectPlayQueue,
  updatePlaying,
  updatePlayQueue,
} from "../../podcastSlice";
import useAudioSettings from "./useAudioSettings";

const AudioPlayer = ({ podcast }) => {
  const currentlyPlaying = useSelector(selectCurrentlyPlaying);
  const playQueue = useSelector(selectPlayQueue);

  let [playing, setPlaying] = useAudioSettings(podcast.title);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!podcast || podcast.title !== currentlyPlaying) {
      setPlaying(false);
    } else if (podcast.title === currentlyPlaying) {
      setPlaying(true);
    }
  }, [currentlyPlaying, playing, podcast.title]);

  const handlePlay = () => {
    setPlaying(true);
    dispatch(updatePlaying(podcast.title));
  };

  const handleNextPodcast = () => {
    setPlaying(false);
    const currentPodIdx = playQueue.findIndex((p) => p.title === podcast.title);
    const isInPlaylist = !!currentPodIdx;

    if (isInPlaylist < 0) return;

    const nextPodcast = playQueue[currentPodIdx + 1];
    dispatch(updatePlaying(nextPodcast.title));
    dispatch(updatePlayQueue(nextPodcast));
  };

  if (podcast) {
    return (
      <div className="player">
        <audio
          loop={false}
          onEnded={handleNextPodcast}
          onPlay={handlePlay}
          controls
          id={podcast.title}
        >
          {<source src={podcast.audio} />}
        </audio>
      </div>
    );
  }
};

export default AudioPlayer;
