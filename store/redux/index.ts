import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userReducer from './modules/user';
import courseReducer from './modules/course';
import missionCenterReducer from './modules/missionCenter';

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    missionCenter: missionCenterReducer
  }
});

const wrapper = createWrapper(() => store);
export default wrapper;

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;
