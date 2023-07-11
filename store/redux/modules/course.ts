import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import webApi from '@/service';
import {
  CourseLessonType,
  CourseResponse,
  UnitPagesListType
} from '@/service/webApi/course/type';
import { message } from 'antd';
import { DropData } from '@/components/Common/DropDown/type';

export interface CourseStateType {
  courseList: CourseResponse[];
  count: number;
  unitsLessonsList: UnitPagesListType[];
}

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courseList: [],
    count: 0,
    unitsLessonsList: []
  } as CourseStateType,
  reducers: {
    increment(state, { type, payload }) {
      state.count = payload;
    },

    setUnitsLessonsList(state, { type, payload }) {
      state.unitsLessonsList = payload;
    }
  },
  extraReducers: (builder) => {
    // Hydrate的操作, 保证服务端端和客户端数据的一致性
    builder
      .addCase(HYDRATE, (state, action: any) => {
        return {
          ...state,
          ...action.payload.course
        };
      })
      .addCase(getCourseList.fulfilled, (state, { payload }) => {
        state.courseList = payload;
      });
  }
});

// 异步的action
export const getCourseList = createAsyncThunk('getCourseList', async () => {
  try {
    const res = (await webApi.courseApi.getCourseList()) || [];
    console.log(res);
    return res;
  } catch (err: any) {
    message.error(`Course ${err.msg}`);
    return [];
  }
});

// 同步的action
export const { increment, setUnitsLessonsList } = courseSlice.actions;
export default courseSlice.reducer;
