import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { GrSubtract } from 'react-icons/gr';
import { VscAdd } from 'react-icons/vsc';
import { LearningTrackDetailContext } from '@/components/Mobile/MobDetailPageV2/Provider/LearningTrackDetailProvider';
import { SectionContext } from '@/components/Mobile/MobDetailPageV2/Provider/SectionProvider';
import { cn } from '@/helper/utils';
interface SectionWrapProps {
  children: ReactNode;
  sectionIndex: number;
  title: ReactNode;
}

const SectionWrap: FC<SectionWrapProps> = ({
  children,
  sectionIndex,
  title
}) => {
  const {
    learningSectionIndex,
    learningTrackDetail,
    expandList,
    setExpandList
  } = useContext(LearningTrackDetailContext);

  const enrolled = !!learningTrackDetail?.enrolled;

  const { section } = useContext(SectionContext);

  const [expand, setExpand] = useState(
    enrolled && learningSectionIndex === sectionIndex
  );

  useEffect(() => {
    setExpand(expandList.includes(sectionIndex));
  }, [expandList, sectionIndex]);

  useEffect(() => {
    const value = enrolled && learningSectionIndex === sectionIndex;
    setExpand(value);
    if (value) {
      setExpandList((prevState) => {
        if (prevState.includes(sectionIndex)) return prevState;
        return prevState.concat(sectionIndex);
      });
    } else {
      setExpandList((prevState) => {
        return prevState.filter((item) => item !== sectionIndex);
      });
    }
  }, [learningTrackDetail?.enrolled]);

  return (
    <>
      <div
        className={cn(
          'flex w-full cursor-pointer items-center justify-between rounded-[8px] px-4 py-2',
          expand ? 'bg-neutral-off-white' : ''
        )}
        onClick={() => {
          const value = !expand;
          setExpand(value);
          if (value) {
            !expandList.includes(sectionIndex) &&
              setExpandList(expandList.concat(sectionIndex));
          } else {
            setExpandList(expandList.filter((item) => item !== sectionIndex));
          }
        }}
      >
        <div className="flex gap-4">
          <span className="body-m-bold">{title}</span>
          {(section?.progress || 0) >= 1 && (
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="0.937988"
                width="24"
                height="24"
                rx="12"
                fill="#00C365"
              />
              <path
                d="M18.4881 8.72426L9.82143 18.0576C9.69578 18.1931 9.51954 18.2703 9.33476 18.2709C9.15756 18.272 8.98724 18.2024 8.86143 18.0776L5.52809 14.7443C5.26668 14.4828 5.26668 14.059 5.52809 13.7976C5.78951 13.5362 6.21334 13.5362 6.47476 13.7976L9.33476 16.6443L17.5148 7.8176C17.6717 7.62411 17.9233 7.53424 18.1673 7.58458C18.4113 7.63491 18.6068 7.81707 18.6743 8.05686C18.7418 8.29664 18.67 8.55406 18.4881 8.72426Z"
                fill="white"
              />
            </svg>
          )}
        </div>
        <div className="flex">
          {/* {enrolled && !!section?.progress && <SectionProgress />} */}
          <ExpandButton />
        </div>
      </div>
      <div className={cn(expand ? 'block' : 'hidden')}>{children}</div>
    </>
  );

  function ExpandButton() {
    return (
      <>
        {!expand && (
          <div className="h-fit w-fit">
            <VscAdd size={20}></VscAdd>
          </div>
        )}
        {expand && (
          <div className="h-fit w-fit">
            <GrSubtract size={20}></GrSubtract>
          </div>
        )}
      </>
    );
  }

  function SectionProgress() {
    const progress = section?.progress || 0;
    if (progress > 0 && progress < 1) {
      return (
        <div className="mr-4 flex items-center gap-2">
          <div className="relative h-[6px] w-[200px] max-w-[12.5rem] rounded-[3px] bg-neutral-off-white">
            <div
              className="absolute left-0 top-0 h-full rounded-[3px] bg-yellow-primary"
              style={{
                width: `${progress * 100}%`
              }}
            ></div>
          </div>
          <span className="body-xs text-neutral-rich-gray">
            {progress * 100}%
          </span>
        </div>
      );
    }

    if (progress >= 1) {
      return (
        <div className="mr-[3.75rem] flex items-center gap-3">
          <span className="body-s-bold text-neutral-black">Complete</span>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.5" width="24" height="24" rx="12" fill="#00C365" />
            <path
              d="M18.4871 8.28628L9.82045 17.6196C9.6948 17.7551 9.51856 17.8323 9.33378 17.8329C9.15658 17.834 8.98626 17.7644 8.86045 17.6396L5.52712 14.3063C5.2657 14.0449 5.2657 13.621 5.52712 13.3596C5.78853 13.0982 6.21237 13.0982 6.47378 13.3596L9.33378 16.2063L17.5138 7.37961C17.6707 7.18612 17.9224 7.09625 18.1663 7.14659C18.4103 7.19693 18.6058 7.37908 18.6733 7.61887C18.7408 7.85866 18.669 8.11607 18.4871 8.28628Z"
              fill="white"
            />
          </svg>
        </div>
      );
    }
  }
};

export default SectionWrap;
