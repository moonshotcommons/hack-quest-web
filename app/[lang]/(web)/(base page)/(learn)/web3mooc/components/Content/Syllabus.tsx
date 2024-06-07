import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useMemo, useState } from 'react';
import { syllabusData, titleTxtData } from '../../constants/data';
import Title from '../Title';
import { IoIosArrowUp } from 'react-icons/io';
import { IoAdd, IoRemoveOutline } from 'react-icons/io5';
import Link from 'next/link';
import { RiShareBoxLine } from 'react-icons/ri';
import { cloneDeep } from 'lodash-es';
import { AuthType, useUserStore } from '@/store/zustand/userStore';

interface SyllabusProp {}

const Syllabus: React.FC<SyllabusProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  const [expandAll, setExpandAll] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [syllabusList, setSyllabusList] = useState(syllabusData);

  const userInfo = useUserStore((state) => state.userInfo);

  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const setAuthType = useUserStore((state) => state.setAuthType);

  const list = useMemo(() => {
    const len = showMore ? syllabusList.length : 7;
    return syllabusList.slice(0, len);
  }, [showMore, syllabusList]);
  const handleExpandAll = () => {
    const isExpandAll = !expandAll;
    const newList = syllabusList.map((v) => ({
      ...v,
      expand: isExpandAll
    }));
    setSyllabusList(newList);
    setExpandAll(isExpandAll);
  };
  const handleExpand = (i: number) => {
    const newList = cloneDeep(syllabusList);
    newList[i].expand = !newList[i].expand;
    setSyllabusList(newList);
    setExpandAll(newList.some((v) => v.expand));
  };

  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex items-center justify-between">
        <Title title={t(titleTxtData[3])} />
        <div className="underline-m cursor-pointer text-neutral-black" onClick={handleExpandAll}>
          {expandAll ? t('courses.collapseAll') : t('courses.expandAll')}
        </div>
      </div>
      <p className="body-m font-[300] text-neutral-rich-gray">{t('ntuCourse.syllabus.desc')}</p>
      <div>
        {list.map((v, i) => (
          <div
            key={i}
            className={`flex flex-col gap-[12px] border-b border-neutral-medium-gray  ${i ? 'py-[20px]' : 'pb-[20px]'} ${i === syllabusData.length - 1 && 'border-transparent pb-[0]'}`}
          >
            <p className="body-m-bold flex cursor-pointer justify-between gap-[20px]" onClick={() => handleExpand(i)}>
              <span>{v.name}</span>

              <span className="relative top-[-3px] flex-shrink-0">
                {v.expand ? <IoRemoveOutline size={28} /> : <IoAdd size={28} />}
              </span>
            </p>
            {v.expand && (
              <>
                <div className="body-m flex gap-9">
                  <div className="w-[52%]">
                    <p className="text-neutral-medium-gray">{t('ntuCourse.time')}</p>
                    <p>{v.time || '-'}</p>
                  </div>
                  <div className="w-[48%]">
                    <p className="  text-neutral-medium-gray">{t('ntuCourse.syllabus.speaker')}</p>
                    <p className="truncate">{v.speaker || '-'}</p>
                  </div>
                </div>
                <div className="">
                  <p className="text-neutral-medium-gray">{t('ntuCourse.syllabus.resources')}</p>
                  {v.video || v.slide ? (
                    <div className="flex items-center gap-[12px]">
                      {v.video && (
                        <Link
                          href={userInfo ? v.video : '#'}
                          target={userInfo ? '_blank' : ''}
                          className="flex items-center gap-[4px]"
                          onClick={(e) => {
                            if (!userInfo) {
                              e.preventDefault();
                              setAuthType(AuthType.LOGIN);
                              setAuthModalOpen(true);
                            }
                          }}
                        >
                          <RiShareBoxLine size={16} />
                          <span className="underline-m">{t('ntuCourse.syllabus.video')}</span>
                        </Link>
                      )}
                      {v.slide && (
                        <Link
                          href={userInfo ? v.slide : '#'}
                          target={userInfo ? '_blank' : ''}
                          className="flex items-center gap-[4px]"
                          onClick={(e) => {
                            if (!userInfo) {
                              e.preventDefault();
                              setAuthType(AuthType.LOGIN);
                              setAuthModalOpen(true);
                            }
                          }}
                        >
                          <RiShareBoxLine size={16} />
                          <span className="underline-m">{t('ntuCourse.syllabus.slide')}</span>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <p>-</p>
                  )}
                </div>
                {v.description && <p className="text-neutral-rich-gray">{v.description}</p>}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="body-l flex justify-center text-neutral-black">
        <div className="flex cursor-pointer items-center gap-[8px]" onClick={() => setShowMore(!showMore)}>
          <span>{showMore ? t('showLess') : t('showMore')}</span>
          <IoIosArrowUp className={`transition-all ${showMore ? '' : 'rotate-[180deg]'}`} />
        </div>
      </div>
    </div>
  );
};

export default Syllabus;
