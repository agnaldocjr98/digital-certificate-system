import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/presentation/redux/slices/userSlice";
import registerScheduling from "@/presentation/redux/slices/registerSchedulingSlice";
import videoConference from "@/presentation/redux/slices/videoConferenceSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    registerScheduling: registerScheduling,
    videoConference: videoConference,
  },
});

export default store;
