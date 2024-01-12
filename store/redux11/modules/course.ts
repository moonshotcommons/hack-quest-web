import { createSlice } from '@reduxjs/toolkit';
import {
  ProjectCourseType,
  UnitPagesListType
} from '@/service/webApi/course/type';

export interface CourseStateType {
  courseList: ProjectCourseType[];
  count: number;
  unitsLessonsList: UnitPagesListType[];
  learnPageTitle: string;
}

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courseList: [],
    count: 0,
    unitsLessonsList: [],
    learnPageTitle: ''
  } as CourseStateType,
  reducers: {
    increment(state, { type, payload }) {
      state.count = payload;
    },

    setUnitsLessonsList(state, { type, payload }) {
      state.unitsLessonsList = payload;
    },

    setCourseList(state, { type, payload }) {
      state.courseList = payload;
    },
    setLearnPageTitle(state, { type, payload }) {
      state.learnPageTitle = decodeURIComponent(payload);
    }
  }
  // extraReducers: (builder) => {
  //   // Hydrate的操作, 保证服务端端和客户端数据的一致性
  //   builder
  //     .addCase(HYDRATE, (state, action: any) => {
  //       return {
  //         ...state,
  //         ...action.payload.course
  //       };
  //     })
  //     .addCase(getCourseList.fulfilled, (state, { payload }) => {
  //       state.courseList = payload;
  //     });
  // }
});

// 异步的action
// export const getCourseList = createAsyncThunk('getCourseList', async () => {
//   try {
//     const res = (await webApi.courseApi.getCourseList()) || [];
//     return res;
//   } catch (err: any) {
//     message.error(`Course ${err.msg}`);
//     return [];
//   }
// });

// 同步的action
export const {
  increment,
  setUnitsLessonsList,
  setCourseList,
  setLearnPageTitle
} = courseSlice.actions;
export default courseSlice.reducer;
