import { GetClientsContent } from "@/domain/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  index: number;
  currentClient: GetClientsContent;
}

const initialState: State = {
  index: 0,
  currentClient: {} as GetClientsContent,
};

const slice = createSlice({
  name: "registerscheduling",
  initialState,
  reducers: {
    changeIndex(state, { payload }: PayloadAction<number>) {
      state.index = payload;
    },
    changeCurrentClient(state, { payload }: PayloadAction<GetClientsContent>) {
      state.currentClient = payload;
    },
  },
});

export default slice.reducer;
export const { changeIndex, changeCurrentClient } = slice.actions;
export const useRegisterScheduling = (state) => {
  return state.registerScheduling as State;
};
