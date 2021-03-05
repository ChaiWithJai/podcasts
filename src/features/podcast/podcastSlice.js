import { findIndex } from "lodash";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url =
  "https://gist.githubusercontent.com/CervantesVive/3f85bf26672cf27fe1cd932ffcb7ecac/raw/4de50b351a62158083a97f3b950bd786d3ffd928/awesome-podcasts.json";

export const getPodcasts = createAsyncThunk("podcast/getPodcasts", async () =>
  fetch(url).then((response) => response.json())
);

const formatPodcasts = (list) =>
  list?.map((podcast) => ({ ...podcast, isSelected: false }));

const initialState = {
  playQueue: [],
  podcasts: [],
  currentlyPlaying: "",
  status: "idle",
};

const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    updatePlaying: (state, action) => {
      state.currentlyPlaying = action.payload;
    },
    updatePlayQueue: (state, {payload: podcast}) => {
      const idx = findIndex(state.playQueue, podcast);
      const isAlreadyInPlayQueue = !!idx;
      if (isAlreadyInPlayQueue) {
        state.playQueue = state.playQueue.slice(idx);
      }
    },
    updatePodcast: (state, { payload: podcast }) => {
      const idx = findIndex(state.podcasts, podcast);
      state.podcasts[idx] = { ...podcast, isSelected: !podcast.isSelected };
      if (!podcast.isSelected) state.playQueue.push(podcast);
    },
  },
  extraReducers: {
    [getPodcasts.pending]: (state) => {
      state.status = "loading";
    },
    [getPodcasts.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.podcasts.push(...formatPodcasts(payload.podcasts));
    },
    [getPodcasts.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { updatePlaying, updatePodcast, updatePlayQueue } = podcastSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAllPodcasts = (state) => state.podcast.podcasts;
export const selectPodcastStatus = (state) => state.podcast.status;
export const selectCurrentlyPlaying = (state) => state.podcast.currentlyPlaying;
export const selectPlayQueue = (state) => state.podcast.playQueue;

export default podcastSlice.reducer;
