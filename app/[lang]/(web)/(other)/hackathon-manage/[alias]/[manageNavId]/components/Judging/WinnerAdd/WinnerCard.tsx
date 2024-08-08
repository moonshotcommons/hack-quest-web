import React, { useEffect, useState } from 'react';
import WinnerName from '../WinnerName';
import WinnerProject from '../WinnerProject';
import { MotionProps, motion } from 'framer-motion';
import { CiEdit } from 'react-icons/ci';
import { useDebounceFn } from 'ahooks';
import { IoMdCloseCircle } from 'react-icons/io';
import ProjectsModal from './ProjectsModal';
import { HackathonJugingInfoType, HackathonWinnerType } from '@/service/webApi/resourceStation/type';

const animateProps: MotionProps = {
  initial: { scaleY: 0, opacity: 0, translateY: '-95%' },
  animate: {
    opacity: 1,
    scaleY: 1,
    translateY: '-100%',
    position: 'absolute'
  },
  exit: {
    opacity: 1,
    scaleY: 1,
    translateY: '-100%',
    position: 'absolute'
  },
  transition: { duration: 0.5, type: 'spring' },
  style: { originY: 'bottom' }
};

interface WinnerCardProp {
  handleChangeWinner: (winner: HackathonWinnerType) => void;
  handleRemoveWinner: () => void;
  winner: HackathonWinnerType;
  disabled?: boolean;
  judgeInfo: HackathonJugingInfoType;
}

const WinnerCard: React.FC<WinnerCardProp> = ({
  winner,
  handleChangeWinner,
  disabled = false,
  handleRemoveWinner,
  judgeInfo
}) => {
  const [isEditWinnerName, setIsEditWinnerName] = useState(true);
  const [isEditProject, setIsEditProject] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState(winner.project?.name || '');
  const { run: hideProjectsModal } = useDebounceFn(
    () => {
      setShowModal(false);
    },
    { wait: 100 }
  );

  useEffect(() => {
    if (winner.project?.id) {
      setIsEditProject(false);
    }
  }, [winner]);
  return (
    <div
      className={`body-l relative flex w-full items-center gap-[20px] rounded-[10px]   border-[2px]  px-[24px] py-[20px] pr-[36px] text-neutral-off-black  ${!disabled ? 'group hover:border-neutral-medium-gray' : 'border-neutral-light-gray'}`}
    >
      <WinnerName
        winner={winner}
        handleChangeName={(name) =>
          handleChangeWinner({
            ...winner,
            name
          })
        }
        disabled={disabled}
        initEdit={isEditWinnerName}
      />
      <div className="flex flex-1 flex-shrink-0">
        {isEditProject ? (
          <div className="relative flex-1">
            <input
              className="body-l w-full border-none outline-none"
              placeholder="Type a name of a project or submitter to search..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onFocus={() => {
                hideProjectsModal.cancel();
                setShowModal(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  hideProjectsModal();
                }, 500);
              }}
            />
            {showModal && (
              <motion.div {...animateProps} className={'absolute left-[-20px] top-[-30px] z-[999] w-full'}>
                <ProjectsModal
                  projects={judgeInfo?.projects || []}
                  handleSelect={(project) => {
                    handleChangeWinner({
                      ...winner,
                      project
                    });
                    setProjectName(project.name);
                    hideProjectsModal();
                  }}
                  projectName={projectName}
                />
              </motion.div>
            )}
          </div>
        ) : (
          <div className="flex flex-1 flex-shrink-0 items-center gap-[20px] overflow-hidden">
            <div className="w-0 flex-1">
              <WinnerProject project={winner.project} isLink={disabled} />
            </div>
            <CiEdit
              size={24}
              className="hidden cursor-pointer  group-hover:block"
              onClick={() => {
                if (disabled) return;
                setIsEditProject(true);
                setIsEditWinnerName(true);
              }}
            />
          </div>
        )}
      </div>

      {!isEditProject && !disabled && (
        <div
          className="absolute right-[-10px] top-[-12px] hidden cursor-pointer rounded-[50%] bg-neutral-white  text-neutral-medium-gray group-hover:block"
          onClick={() => {
            if (disabled) return;
            handleRemoveWinner();
          }}
        >
          <IoMdCloseCircle size={24} />
        </div>
      )}
    </div>
  );
};

export default WinnerCard;
