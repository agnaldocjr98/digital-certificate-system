import { GetInfoSchedulingContent } from "@/domain/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<GetInfoSchedulingContent> = {};

export const slice = createSlice({
  name: "VideoConference",
  initialState,
  reducers: {
    setVideoConference(
      state,
      { payload }: PayloadAction<Partial<GetInfoSchedulingContent>>
    ) {
      return payload;
    },
  },
});

export default slice.reducer;
export const { setVideoConference } = slice.actions;
export const useVideoConference = ({ videoConference }) => {
  return videoConference as GetInfoSchedulingContent;
};
