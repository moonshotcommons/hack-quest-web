import { create } from 'zustand';
import submissions from '../../constants/submissions.json';

export type SubmissionState = (typeof submissions)['Additions' | 'BasicInfo' | 'ProjectDetail'][number] & {
  property: Record<string, any>;
};

type SubmissionStore = {
  basicInfoState: SubmissionState[];
  projectDetailState: SubmissionState[];
  additionState: SubmissionState[];
  setBasicInfoState: (payload: SubmissionState[]) => void;
  setProjectDetailState: (payload: SubmissionState[]) => void;
  setAdditionState: (payload: SubmissionState[]) => void;
};

export const useSubmissionState = create<SubmissionStore>((set) => ({
  basicInfoState: [...submissions.BasicInfo],
  projectDetailState: [...submissions.ProjectDetail],
  additionState: [...submissions.Additions],
  setBasicInfoState: (payload) => set({ basicInfoState: payload }),
  setProjectDetailState: (payload) => set({ projectDetailState: payload }),
  setAdditionState: (payload) => set({ additionState: payload })
}));

export function isCustomField(state: SubmissionState) {
  return state.type === 'radio' || state.type === 'input';
}
