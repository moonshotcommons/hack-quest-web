import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import webApi from '@/service';
import { LoginResponse } from '@/service/webApi/user/type';
import { omit } from 'lodash-es';
import {
  getUser,
  removeToken,
  removeUser,
  setToken,
  setUser
} from '@/helper/user-token';
export interface UserStateType {
  userInfo: LoginResponse | null;
  settingsOpen: boolean;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    settingsOpen: false
  } as UserStateType,
  reducers: {
    // loginReducer(state, { type, payload }) {
    //   console.log('state', type, payload);
    // }

    setUserInfo(state, { type, payload }) {
      state.userInfo = payload;
    },

    userSignOut(state) {
      state.userInfo = null;
      removeToken();
    },

    setSettingsOpen(state, { type, payload }) {
      state.settingsOpen = payload;
    }
  }
  // extraReducers: (builder) => {
  //   // Hydrate的操作, 保证服务端端和客户端数据的一致性
  //   builder
  //     .addCase(HYDRATE, (state, action: any) => {
  //       return {
  //         ...state,
  //         ...action.payload.home
  //       };
  //     })
  //     .addCase(userLogin.fulfilled, (state, { payload }) => {
  //       state.username = payload.username;
  //     });
  // }
});
// 异步的action
// export const userLogin = createAsyncThunk(
//   'userLogin',
//   async (params: object) => {
//     const res = await webApi.userApi.login(params);
//     return res;
//   }
// );

// 同步的action
export const { setUserInfo, userSignOut, setSettingsOpen } = userSlice.actions;
export default userSlice.reducer;
