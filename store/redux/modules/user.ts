import { removeToken } from '@/helper/user-token';
import { LoginResponse } from '@/service/webApi/user/type';
import { createSlice } from '@reduxjs/toolkit';

export enum UnLoginType {
  LOGIN = 'Log in',
  SIGN_UP = 'Sign Up',
  EMAIL_VERIFY = 'Email Verify',
  FORGOT_PASSWORD = 'Forgot Password'
}
export interface UserStateType {
  userInfo: LoginResponse | null;
  settingsOpen: boolean;
  loginRouteType: {
    type: UnLoginType;
    prevType: UnLoginType;
    params: Record<string, any>;
  };
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    settingsOpen: false,
    loginRouteType: {
      type: UnLoginType.LOGIN,
      prevType: UnLoginType.LOGIN,
      params: {}
    }
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
    },

    setUnLoginType(state, { type, payload }) {
      if (!payload) return;
      const types = Object.values(UnLoginType);
      if (types.includes(payload)) {
        payload = {
          type: payload,
          prevType: state.loginRouteType.type,
          params: {}
        };
      } else if (types.includes(payload?.type)) {
        payload = {
          type: payload.type,
          prevType: state.loginRouteType.type,
          params: payload.params || {}
        };
      }

      state.loginRouteType = payload;
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
export const { setUserInfo, userSignOut, setSettingsOpen, setUnLoginType } =
  userSlice.actions;
export default userSlice.reducer;
