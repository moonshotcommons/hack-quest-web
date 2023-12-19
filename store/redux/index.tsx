'use client';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userReducer from './modules/user';
import courseReducer from './modules/course';
import missionCenterReducer from './modules/missionCenter';
import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    missionCenter: missionCenterReducer
  }
});

export function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

const wrapper = createWrapper(() => store);
export default wrapper;

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;
