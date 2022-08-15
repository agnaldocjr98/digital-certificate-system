import { configureStore } from "@reduxjs/toolkit";
import {
  userReducer,
  registerSchedulingReducer,
  videoConferenceReducer,
  schedulingReducer,
} from "@/presentation/redux/slices";

const store = configureStore({
  reducer: {
    user: userReducer,
    registerScheduling: registerSchedulingReducer,
    videoConference: videoConferenceReducer,
    schedulings: schedulingReducer,
  },
});

export default store;
