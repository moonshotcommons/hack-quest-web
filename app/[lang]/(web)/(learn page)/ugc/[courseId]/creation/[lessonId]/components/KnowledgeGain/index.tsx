import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import TextArea from '@/components/Common/TextArea/indexTextArea';
import { changeInputWidth, isNull } from '@/helper/utils';
import { FC, useContext, useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { IoMdAddCircle } from 'react-icons/io';
import { v4 } from 'uuid';
import { defaultFormLi } from '../../../constant/data';
import { cloneDeep } from 'lodash-es';
import {
  CreationHandle,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';
import { useShallow } from 'zustand/react/shallow';
import webApi from '@/service';
import { useRedirect } from '@/hooks/useRedirect';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import message from 'antd/es/message';
import { UgcCreateContext } from '../../../constant/type';
import useUgcCreationDataHandle from '@/hooks/useUgcCreationDataHandle';

interface KnowledgeGainProps {}

const KnowledgeGain: FC<KnowledgeGainProps> = (props) => {
  const formLi = cloneDeep(defaultFormLi);
  const { setLoading, handle, setHandle } = useUgcCreationStore(
    useShallow((state) => ({
      setLoading: state.setLoading,
      handle: state.handle,
      setHandle: state.setHandle
    }))
  );
  const {
    courseInformation: { knowledgeGain },
    courseId,
    selectLessonId,
    handleNext
  } = useContext(UgcCreateContext);
  const { redirectToUrl } = useRedirect();
  const { setInformation } = useUgcCreationDataHandle();
  const [descriptionList, setDescriptionList] = useState<Record<string, any>[]>(
    [
      {
        ...formLi,
        id: v4()
      }
    ]
  );
  const [tagList, setTagList] = useState<Record<string, any>[]>([]);
  const handleAdd = (type = 'description') => {
    let list, setList, initData;
    if (type === 'description') {
      list = descriptionList;
      setList = setDescriptionList;
      initData = { ...formLi, id: v4() };
    } else {
      if (tagList.some((v) => isNull(v.label))) {
        message.warning('Please fill in first');
        return;
      }
      list = tagList;
      setList = setTagList;
      initData = { label: '', id: v4() };
    }
    setList([...list, initData]);
  };
  const handleChange = (value: string, index: number, type = 'description') => {
    let list, setList, changeData;
    if (type === 'description') {
      list = descriptionList;
      setList = setDescriptionList;
      changeData = {
        ...list[index],
        value,
        status: 'default',
        errorMessage: ''
      };
    } else {
      list = tagList;
      setList = setTagList;
      changeData = {
        ...list[index],
        label: value
      };
    }
    list[index] = changeData;
    setList([...list]);
  };
  const handleDelete = (id: string, type = 'description') => {
    let list, setList;
    if (type === 'description') {
      list = descriptionList;
      setList = setDescriptionList;
    } else {
      list = tagList;
      setList = setTagList;
    }
    const newList = list.filter((v) => v.id !== id);
    setList(newList);
  };
  const handleSubmit = () => {
    let newDescriptionList = descriptionList.filter((v) => !isNull(v.value));
    let newrTagList = tagList.filter((v) => !isNull(v.label));
    if (!newDescriptionList.length && !newrTagList.length) {
      message.error(`It can't all be empty`);
      setHandle(CreationHandle.UN_SAVE);
      return;
    }
    const param = {
      knowledgeGain: {
        description: newDescriptionList.map((v) => v.value),
        tags: newrTagList.map((v) => v.label)
      }
    };
    setLoading(true);
    webApi.ugcCreateApi
      .informationEdit(courseId, param)
      .then(() => {
        message.success('success');
        setInformation(courseId);
        if (handle === CreationHandle.ON_NEXT) {
          handleNext();
        } else {
          redirectToUrl(
            `${MenuLink.UGC}/${courseId}/creation/${selectLessonId}`,
            true
          );
        }
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
    if (knowledgeGain) {
      let newDescriptionList =
        knowledgeGain?.description?.map((v) => ({
          ...formLi,
          value: v,
          id: v4()
        })) || [];
      let newTagList =
        knowledgeGain?.tags?.map((v) => ({
          label: v,
          id: v4()
        })) || [];
      newDescriptionList = newDescriptionList.length
        ? newDescriptionList
        : [
            {
              ...formLi,
              id: v4()
            }
          ];
      setDescriptionList(newDescriptionList);
      setTagList(newTagList);
    }
  }, [knowledgeGain]);

  useEffect(() => {
    if (
      handle === CreationHandle.ON_SAVE ||
      handle === CreationHandle.ON_NEXT
    ) {
      handleSubmit();
    }
  }, [handle]);
  return (
    <div className="[&>div:w-full] flex h-full flex-col gap-[30px] text-neutral-black">
      <div className="text-center ">
        <span className="text-h3 font-next-book-bold">Knowledge Gain </span>
        <span className="body-xl">(Optional)</span>
      </div>
      <div className="body-m">
        {`While optional, this step enhances transparency, aiding students in gauging the course's relevance to their goals. By showcasing the specific knowledge gained, you spark anticipation and excitement about the valuable insights awaiting participants. Consider it a brief yet impactful way to set expectations and engage your audience.`}
      </div>
      <div>
        <p className="text-h4 mb-[20px] font-next-book-bold">
          What You Will Learn
        </p>
        <div className="flex flex-col gap-[20px]">
          {descriptionList.map((v, index) => (
            <div key={v.id} className="group relative w-[calc(100%+63px)]">
              <div className="w-[calc(100%-63px)] ">
                <TextArea
                  name=""
                  className=" text-neutral-black"
                  placeholder="Describe the knowledge students will learn."
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
              {descriptionList.length > 1 && (
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
        <p className="text-h4 mb-[20px] font-next-book-bold">
          What You Will Gain
        </p>
        <div className="flex flex-wrap gap-[20px]">
          {tagList.map((v, index) => (
            <div key={v.id}>
              {v.label ? (
                <div className="body-m group relative flex h-[48px] cursor-pointer items-center overflow-hidden rounded-[24px] border border-neutral-medium-gray px-[24px] hover:border-yellow-extra-light">
                  {v.label}
                  <div
                    className="absolute left-0 top-0 hidden h-full w-full items-center justify-center bg-yellow-extra-light text-neutral-medium-gray group-hover:flex"
                    onClick={() => handleDelete(v.id, 'gain')}
                  >
                    <FiTrash2 size={20} />
                  </div>
                </div>
              ) : (
                <Input
                  theme={'light'}
                  name=""
                  maxLength={41}
                  className="body-m h-[48px] w-[150px]"
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    const len = input.value.length;
                    if (len > 40) {
                      message.warning('40 characters maximum');
                      input.value = input.value.slice(0, 40);
                    }
                    changeInputWidth(input, 150);
                  }}
                  onKeyUp={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (e.code === 'Enter') {
                      handleChange(target.value, index, 'gain');
                    }
                  }}
                  onBlur={(e) => {
                    handleChange(e.target.value, index, 'gain');
                  }}
                />
              )}
            </div>
          ))}
          <Button
            onClick={() => handleAdd('gain')}
            icon={<IoMdAddCircle size={24} />}
            className="body-s h-[48px] w-[142px] border-[0.5px] border-dashed border-neutral-medium-gray p-0 text-neutral-medium-gray"
          >
            Add more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGain;
