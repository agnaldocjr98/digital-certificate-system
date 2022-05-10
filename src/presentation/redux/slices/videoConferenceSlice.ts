import { GetInfoClientsContent } from "@/domain/models/model-get-info-client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<GetInfoClientsContent> = {};

export const slice = createSlice({
  name: "VideoConference",
  initialState,
  reducers: {
    setVideoConference(
      state,
      { payload }: PayloadAction<Partial<GetInfoClientsContent>>
    ) {
      return payload;
    },
  },
});

export default slice.reducer;
export const { setVideoConference } = slice.actions;
export const useVideoConference = ({ videoConference }) => {
  return videoConference as GetInfoClientsContent;
};
