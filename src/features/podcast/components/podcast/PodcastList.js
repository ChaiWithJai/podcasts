import React from "react";
import PodcastRow from "./PodcastRow";

const PodcastList = ({ list }) => {
  return (
    <>
      {list?.length &&
        list.map((podcast, index) => (
          <PodcastRow id={index} key={podcast.title} podcast={podcast} />
        ))}
    </>
  );
};

export default PodcastList;
