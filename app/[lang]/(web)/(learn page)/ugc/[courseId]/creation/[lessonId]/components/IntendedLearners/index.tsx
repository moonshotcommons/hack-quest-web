import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import TextArea from '@/components/Common/TextArea/indexTextArea';
import Button from '@/components/Common/Button';
import { IoMdAddCircle } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import {
  CreationHandle,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';
import { useShallow } from 'zustand/react/shallow';
import { useRedirect } from '@/hooks/useRedirect';
import { cloneDeep } from 'lodash-es';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import webApi from '@/service';
import { defaultFormLi } from '../../../constant/data';
import { isNull } from '@/helper/utils';
import message from 'antd/es/message';
import { UgcCreateContext } from '../../../constant/type';
import useUgcCreationDataHandle from '@/hooks/useUgcCreationDataHandle';

interface IntendedLearnersProp {}

const IntendedLearners: React.FC<IntendedLearnersProp> = () => {
  const formLi = cloneDeep(defaultFormLi);
  const { setLoading, handle, setHandle } = useUgcCreationStore(
    useShallow((state) => ({
      setLoading: state.setLoading,
      handle: state.handle,
      setHandle: state.setHandle
    }))
  );
  const {
    courseInformation: { intendedLearners },
    courseId,
    selectLessonId
  } = useContext(UgcCreateContext);
  const { redirectToUrl } = useRedirect();
  const { setInformation } = useUgcCreationDataHandle();
  const [audienceList, setAudienceList] = useState<Record<string, any>[]>([
    {
      ...formLi,
      id: v4()
    }
  ]);
  const [requirementsList, setRequirementsList] = useState<
    Record<string, any>[]
  >([
    {
      ...formLi,
      id: v4()
    }
  ]);
  const handleAdd = (type = 'audience') => {
    let list, setList;
    if (type === 'audience') {
      list = audienceList;
      setList = setAudienceList;
    } else {
      list = requirementsList;
      setList = setRequirementsList;
    }
    setList([...list, { ...formLi, id: v4() }]);
  };
  const handleChange = (value: string, index: number, type = 'audience') => {
    let list, setList;
    if (type === 'audience') {
      list = audienceList;
      setList = setAudienceList;
    } else {
      list = requirementsList;
      setList = setRequirementsList;
    }
    list[index] = {
      ...list[index],
      value,
      status: 'default',
      errorMessage: ''
    };
    setList([...list]);
  };
  const handleDelete = (id: string, type = 'audience') => {
    let list, setList;
    if (type === 'audience') {
      list = audienceList;
      setList = setAudienceList;
    } else {
      list = requirementsList;
      setList = setRequirementsList;
    }
    const newList = list.filter((v) => v.id !== id);
    setList(newList);
  };

  const handleSubmit = () => {
    let newAudienceList = audienceList.filter((v) => !isNull(v.value));
    let newRequirementsList = requirementsList.filter((v) => !isNull(v.value));
    if (!newAudienceList.length && !newRequirementsList.length) {
      message.error(`It can't all be empty`);
      setHandle(CreationHandle.UN_SAVE);
      return;
    }
    const param = {
      intendedLearners: {
        audience: newAudienceList.map((v) => v.value),
        requirements: newRequirementsList.map((v) => v.value)
      }
    };
    setLoading(true);
    webApi.ugcCreateApi
      .informationEdit(courseId, param)
      .then(() => {
        message.success('success');
        setInformation(courseId);
        redirectToUrl(
          `${MenuLink.UGC}/${courseId}/creation/${selectLessonId}`,
          true
        );
      })
      .catch((err) => {
        message.error(err as string);
      })
      .finally(() => {
        setLoading(false);
        setHandle(CreationHandle.UN_SAVE);
      });
  };

  useEffect(() => {
    if (intendedLearners) {
      let newAudienceList =
        intendedLearners?.audience?.map((v) => ({
          ...formLi,
          value: v,
          id: v4()
        })) || [];
      let newRequirementsList =
        intendedLearners?.requirements?.map((v) => ({
          ...formLi,
          value: v,
          id: v4()
        })) || [];
      newAudienceList = newAudienceList.length
        ? newAudienceList
        : [
            {
              ...formLi,
              id: v4()
            }
          ];
      newRequirementsList = newRequirementsList.length
        ? newRequirementsList
        : [
            {
              ...formLi,
              id: v4()
            }
          ];
      setAudienceList(newAudienceList);
      setRequirementsList(newRequirementsList);
    }
  }, [intendedLearners]);

  useEffect(() => {
    if (handle === CreationHandle.ON_SAVE) {
      handleSubmit();
    }
  }, [handle]);
  return (
    <div className="[&>div:w-full] flex h-full flex-col gap-[30px] text-neutral-black">
      <div className="text-center ">
        <span className="text-h3 font-next-book-bold">Intended Learners </span>
        <span className="body-xl">(Optional)</span>
      </div>
      <div className="body-m">
        {`Clearly define your target audience in a concise list, allowing instructors to tailor the learning experience. Specify any prerequisites or recommended knowledge, promoting inclusivity. While optional, these steps are highly recommended for refining content, empowering learners to assess their fit, and ensuring a smoother enrollment process. Think of it as an invitation for your course to resonate with those who will benefit most from your expertise.`}
      </div>
      <div>
        <p className="text-h4 mb-[20px] font-next-book-bold">
          Who’s This Course For
        </p>
        <div className="flex flex-col gap-[20px]">
          {audienceList.map((v, index) => (
            <div key={v.id} className="group relative w-[calc(100%+63px)]">
              <div className="w-[calc(100%-63px)] ">
                <TextArea
                  name=""
                  className=" text-neutral-black"
                  placeholder="Describe your main audience."
                  initBorderColor="border-neutral-medium-gray"
                  textAreaMinHeight={48}
                  maxLength={180}
                  isShowCount
                  state={v.status as any}
                  errorMessage={v.errorMessage}
                  value={v.value}
                  onChange={(e: any) => {
                    handleChange(e.target.value, index);
                  }}
                />
              </div>
              {audienceList.length > 1 && (
                <div
                  className="absolute right-0 top-0 hidden h-[48px] w-[40px] cursor-pointer items-center justify-center rounded-[3px] bg-yellow-extra-light text-neutral-medium-gray group-hover:flex"
                  onClick={() => handleDelete(v.id)}
                >
                  <FiTrash2 size={20} />
                </div>
              )}
            </div>
          ))}
          <Button
            onClick={() => handleAdd()}
            icon={<IoMdAddCircle size={24} />}
            className="body-s h-[48px] w-full border-[0.5px] border-dashed border-neutral-medium-gray text-neutral-medium-gray"
          >
            Add more
          </Button>
        </div>
      </div>
      <div>
        <p className="text-h4 mb-[20px] font-next-book-bold">Requirements</p>
        <div className="flex flex-col gap-[20px]">
          {requirementsList.map((v, index) => (
            <div key={v.id} className="group relative w-[calc(100%+63px)]">
              <div className="w-[calc(100%-63px)] ">
                <TextArea
                  name=""
                  className=" text-neutral-black"
                  placeholder="Describe your main requirements."
                  initBorderColor="border-neutral-medium-gray"
                  textAreaMinHeight={48}
                  maxLength={180}
                  isShowCount
                  state={v.status as any}
                  errorMessage={v.errorMessage}
                  value={v.value}
                  onChange={(e: any) => {
                    handleChange(e.target.value, index, 'require');
                  }}
                />
              </div>
              {requirementsList.length > 1 && (
                <div
                  className="absolute right-0 top-0 hidden h-[48px] w-[40px] cursor-pointer items-center justify-center rounded-[3px] bg-yellow-extra-light text-neutral-medium-gray group-hover:flex"
                  onClick={() => handleDelete(v.id, 'require')}
                >
                  <FiTrash2 size={20} />
                </div>
              )}
            </div>
          ))}
          <Button
            onClick={() => handleAdd('require')}
            icon={<IoMdAddCircle size={24} />}
            className="body-s h-[48px] w-full border-[0.5px] border-dashed border-neutral-medium-gray text-neutral-medium-gray"
          >
            Add more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntendedLearners;
