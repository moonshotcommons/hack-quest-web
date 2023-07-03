import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { apiUserLogin } from '@/service/webApi/user';

export interface UserStateType {
  username: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: ''
  } as UserStateType,
  reducers: {
    loginReducer(state, { type, payload }) {
      console.log('state', type, payload);
    }
  },
  extraReducers: (builder) => {
    // Hydrate的操作, 保证服务端端和客户端数据的一致性
    builder
      .addCase(HYDRATE, (state, action: any) => {
        return {
          ...state,
          ...action.payload.home
        };
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.username = payload.username;
      });
  }
});
// 异步的action
export const userLogin = createAsyncThunk(
  'userLogin',
  async (params: object) => {
    const res = await apiUserLogin(params);
    return res;
  }
);

// 同步的action
export const { loginReducer } = userSlice.actions;
export default userSlice.reducer;
