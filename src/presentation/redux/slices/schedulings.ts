import { GetSchedulingsContent } from "@/domain/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "schedulings",
  initialState: [] as Partial<GetSchedulingsContent[]>,
  reducers: {
    getSchedulings(state, { payload }: PayloadAction<GetSchedulingsContent[]>) {
      return payload;
    },
    setSchedulings(
      state,
      { payload }: PayloadAction<Partial<GetSchedulingsContent>>
    ) {
      return state.map((st) =>
        st.uid === payload.uid ? { ...st, ...payload } : st
      );
    },
  },
});

export const schedulingReducer = slice.reducer;
export const { setSchedulings, getSchedulings } = slice.actions;
export const useSchedulings = (state) => {
  return state.schedulings as GetSchedulingsContent[];
};
