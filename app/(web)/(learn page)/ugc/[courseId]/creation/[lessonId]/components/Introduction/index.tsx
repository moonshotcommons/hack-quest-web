import Input from '@/components/Common/Input';
import Select from '@/components/Common/Select';
import React, { useEffect, useMemo, useState } from 'react';
import { courseDefaultFilters } from '@/components/Web/Business/CourseFilterList/constant';
import { OptionType } from '@/components/Common/Select/type';
import TextArea from '@/components/Common/TextArea/indexTextArea';
import { cloneDeep } from 'lodash-es';
import {
  CreationHandle,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';
import { CourseLanguageType, CourseType } from '@/service/webApi/course/type';
import webApi from '@/service';
import { useShallow } from 'zustand/react/shallow';
import { message } from 'antd';
import { useRedirect } from '@/hooks/useRedirect';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

interface IntroductionProp {}

const Introduction: React.FC<IntroductionProp> = () => {
  const {
    introduction,
    setLoading,
    handle,
    setHandle,
    courseId,
    selectLessonId
  } = useUgcCreationStore(
    useShallow((state) => ({
      introduction: state.courseInformation.introduction,
      setLoading: state.setLoading,
      handle: state.handle,
      setHandle: state.setHandle,
      courseId: state.courseId,
      selectLessonId: state.selectLessonId
    }))
  );
  const { redirectToUrl } = useRedirect();
  const options = useMemo(() => {
    return {
      trackOptions: courseDefaultFilters
        .find((v) => v.filterField === 'track')
        ?.options.map((v) => ({
          label: v.name,
          value: v.value
        })) as OptionType[],
      levelOptions: courseDefaultFilters
        .find((v) => v.filterField === 'level')
        ?.options.map((v) => ({
          label: v.name,
          value: v.value
        })) as OptionType[]
    };
  }, []);
  const [formData, setFormData] = useState<Record<string, any>>({
    track: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    level: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    title: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    subTitle: {
      value: '',
      status: 'default',
      errorMessage: ''
    },
    description: {
      value: '',
      status: 'default',
      errorMessage: ''
    }
  });

  const handleSubmit = async () => {
    let newFormData = cloneDeep(formData);
    let isValidate = true;
    let param: Record<string, any> = {};
    for (let key in newFormData) {
      if (!newFormData[key].value) {
        newFormData[key].status = 'error';
        newFormData[key].errorMessage = `${key} cannot be empty`;
        isValidate = false;
      }
      param[key] = newFormData[key].value;
    }
    if (!isValidate) {
      setFormData(newFormData);
      setHandle(CreationHandle.UN_SAVE);
      return;
    }
    param.language = CourseLanguageType.SOLIDITY;
    param.type = CourseType.UGC;
    setLoading(true);
    try {
      if (courseId !== '-1') {
        await webApi.ugcCreateApi.informationEdit(courseId, param);
      } else {
        await webApi.ugcCreateApi.introductionAdd(param);
      }
      message.success('success');
      redirectToUrl(
        `${MenuLink.UGC}/${courseId}/creation/${selectLessonId}`,
        true
      );
      setLoading(false);
      setHandle(CreationHandle.UN_SAVE);
    } catch (error) {
      setLoading(false);
      setHandle(CreationHandle.UN_SAVE);
      message.error(error as string);
    }
  };

  useEffect(() => {
    if (courseId !== '-1') {
      for (let key in formData) {
        const value = introduction[key as keyof typeof introduction];
        formData[key].value = value;
      }
      setFormData({ ...formData });
    }
  }, [introduction]);

  useEffect(() => {
    if (handle === CreationHandle.ON_SAVE) {
      handleSubmit();
    }
  }, [handle]);

  return (
    <div className="[&>div:w-full] flex h-full flex-col gap-[30px] text-neutral-black">
      <div className="text-h3 text-center font-next-book-bold">
        Introduction
      </div>
      <div className="body-m ">
        {`Crafting your course's introduction is akin to creating the perfect
        teaser for a movie. This Introduction is the first impression, the spark
        that ignites curiosity. So, make it count – be specific, highlight
        unique value, and articulate how your course meets the needs of your
        audience. It's the key that unlocks the door to a world of learning for
        your students.`}
      </div>
      <div className="flex gap-[20px]">
        <div className="flex-1 flex-shrink-0">
          <Select
            name="track"
            label={
              <span className="body-l text-neutral-medium-gray">
                Course Track*
              </span>
            }
            state={formData.track.status as any}
            errorMessage={formData.track.errorMessage}
            value={formData.track.value || ''}
            className="h-[48px] "
            placeholder="Please Select"
            options={options.trackOptions}
            onChange={(val) => {
              setFormData({
                ...formData,
                track: {
                  ...formData.track,
                  value: val,
                  status: 'default'
                }
              });
            }}
          />
        </div>
        <div className="flex-1 flex-shrink-0">
          <Select
            name="level"
            label={
              <span className="body-l text-neutral-medium-gray">
                Course Difficulty*
              </span>
            }
            state={formData.level.status as any}
            errorMessage={formData.level.errorMessage}
            value={formData.level.value || ''}
            className="h-[48px]"
            placeholder="Please Select"
            options={options.levelOptions}
            onChange={(val) => {
              setFormData({
                ...formData,
                level: {
                  ...formData.level,
                  value: val,
                  status: 'default'
                }
              });
            }}
          />
        </div>
      </div>
      <div className="">
        <Input
          name="title"
          className="h-[48px]  text-neutral-black"
          placeholder="Enter your course title."
          initBorderColor="border-neutral-medium-gray"
          theme={'light'}
          maxLength={60}
          isShowCount
          label={
            <span className="body-l text-neutral-medium-gray">
              Course Title*
            </span>
          }
          state={formData.title.status as any}
          errorMessage={formData.title.errorMessage}
          value={formData.title.value || ''}
          onChange={(e) => {
            setFormData({
              ...formData,
              title: {
                ...formData.title,
                value: e.target.value,
                status: 'default'
              }
            });
          }}
        />
      </div>
      <div className="">
        <TextArea
          name="subTitle"
          className="h-[48px]  text-neutral-black"
          placeholder="Enter your course title."
          initBorderColor="border-neutral-medium-gray"
          maxLength={120}
          isShowCount
          label={
            <span className="body-l text-neutral-medium-gray">
              Course SubTitle*
            </span>
          }
          state={formData.subTitle.status as any}
          errorMessage={formData.subTitle.errorMessage}
          value={formData.subTitle.value || ''}
          onChange={(e) => {
            setFormData({
              ...formData,
              subTitle: {
                ...formData.subTitle,
                value: e.target.value,
                status: 'default'
              }
            });
          }}
        />
      </div>
      <div className="">
        <TextArea
          name="Description"
          className="h-[48px] text-neutral-black"
          placeholder="Enter your course description."
          initBorderColor="border-neutral-medium-gray"
          maxLength={600}
          isShowCount
          label={
            <span className="body-l text-neutral-medium-gray">
              Course Description*
            </span>
          }
          state={formData.description.status as any}
          errorMessage={formData.description.errorMessage}
          value={formData.description.value || ''}
          onChange={(e) => {
            setFormData({
              ...formData,
              description: {
                ...formData.description,
                value: e.target.value,
                status: 'default'
              }
            });
          }}
        />
      </div>
    </div>
  );
};

export default Introduction;
