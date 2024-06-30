import { FC } from 'react';
import { ProjectSubmitStateType } from '../../type';
import SubmitReview from './SubmitReview';
import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import { SubmissionSectionType } from '@/components/HackathonCreation/type';
import BasicInfoSectionForm from './BasicInfoSectionForm';
import ProjectDetailSectionForm from './ProjectDetailSectionForm';
import VideosSectionForm from './VideosSectionForm';
import AdditionsSectionForm from './AdditionsSectionForm';

export interface FormComponentProps {
  type: SubmissionSectionType | 'Review';
  formState: ProjectSubmitStateType;
  setCurrentStep: (step: number) => void;
  hackathonInfo: SimpleHackathonInfo;
  projectId: string | undefined;
  refreshProjectInfo: () => Promise<any>;
  isSubmit: boolean;
}

export type CommonFormComponentProps = Pick<FormComponentProps, 'isSubmit' | 'projectId' | 'refreshProjectInfo'>;

const FormComponent: FC<FormComponentProps> = (props) => {
  const { type, hackathonInfo, formState, setCurrentStep, ...rest } = props;
  const { BasicInfo: basicInfo, ProjectDetail: projectDetail, Videos: videos, Additions: additions } = formState;
  const submission = hackathonInfo.info.submission;
  const { BasicInfo, ProjectDetail, Videos, Additions } = submission;

  switch (type) {
    case SubmissionSectionType.BasicInfo:
      return <BasicInfoSectionForm sectionConfig={BasicInfo} basicInfo={basicInfo} {...rest} />;
    case SubmissionSectionType.Videos:
      return <VideosSectionForm sectionConfig={Videos} videos={videos} {...rest} />;
    case SubmissionSectionType.ProjectDetail:
      return <ProjectDetailSectionForm sectionConfig={ProjectDetail} projectDetail={projectDetail} {...rest} />;
    case SubmissionSectionType.Additions:
      return <AdditionsSectionForm sectionConfig={Additions} additions={additions} {...rest} />;
    case 'Review':
      return (
        <SubmitReview sectionConfig={submission} formState={formState} {...rest} setCurrentStep={setCurrentStep} />
      );
  }
};

export default FormComponent;
