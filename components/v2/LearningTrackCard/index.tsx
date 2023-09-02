import Button from '@/components/Common/Button';
import LearningImage from '@/public/images/home/learning-image.svg';
import Image from 'next/image';
import React from 'react';
const LearningTrackCard: React.FC = () => {
  const status = 1;
  const leftRender = () => {
    return null;
    // switch (status) {
    // case TabValueType.UN_LEARNING:
    // case TabValueType.COMPLETED:
    //   return (
    //     <span className="text-home-default-color">
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //       eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur
    //       adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem
    //       ipsum dolor sit amet
    //     </span>
    //   );
    // case TabValueType.IN_PROGRESS:
    //   return (
    //     <>
    //       <div className="w-full flex items-center justify-between">
    //         <div className="w-[93%] bg-home-learning-track-progress-bg rounded-[3px] h-[7px] overflow-hidden">
    //           <div
    //             className="h-full bg-home-learning-track-progress-active-bg rounded-[3px]"
    //             style={{ width: '50%' }}
    //           ></div>
    //         </div>
    //         <div>48%</div>
    //       </div>
    //       <div>Overall Process</div>
    //     </>
    //   );
    // }
  };

  const rightRender = () => {
    return null;
    // switch (
    //   status
    // case TabValueType.UN_LEARNING:
    //   return (
    //     <>
    //       <div>
    //         <p className="text-[21px] pt-[15px] pb-[10px]">
    //           You need to enroll in this learning track to display next
    //           lesson.
    //         </p>
    //       </div>
    //       <div className="w-full flex justify-between">
    //         <Button className="w-[47%] h-11 border border-home-learning-track-view-button-border text-home-learning-track-view-button-color">
    //           View Syllabus
    //         </Button>
    //         <Button className="w-[47%] h-11 text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg">
    //           Enroll
    //         </Button>
    //       </div>
    //     </>
    //   );
    // case TabValueType.IN_PROGRESS:
    //   return (
    //     <>
    //       <div>
    //         <p className="text-[21px] pt-[15px] pb-[10px]">Deploy Your NFT</p>
    //         <div>sdsdsd</div>
    //       </div>
    //       <div className="w-full flex justify-between">
    //         <Button className="w-[48%] h-11 border border-home-learning-track-view-button-border text-home-learning-track-view-button-color px-0">
    //           View Syllabus
    //         </Button>
    //         <Button className="w-[48%] h-11 text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg px-0">
    //           Resume
    //         </Button>
    //       </div>
    //     </>
    //   );
    // case TabValueType.COMPLETED:
    //   return (
    //     <>
    //       <div>
    //         <p className="text-[21px] pt-[15px] pb-[10px]">
    //           You’ve finished this learning track.
    //         </p>
    //       </div>
    //       <div className="w-full flex justify-between">
    //         <Button className="w-[47%] h-11 border border-home-learning-track-view-button-border text-home-learning-track-view-button-color">
    //           View Syllabus
    //         </Button>
    //       </div>
    //     </>
    //   );
    // ) {
    // }
  };
  return (
    <div
      className="h-[275px] rounded-[10px] bg-home-learning--track-bg overflow-hidden flex flex-col mb-10"
      style={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)'
      }}
    >
      <div className="h-[10px] bg-home-learning--track-border-bg"></div>
      <div className="w-full flex-1 flex items-center p-10 relative">
        <div className="absolute left-[16px] top-[13px]">sdsd</div>
        <div className="w-[69%] flex items-center justify-between px-[37px] h-full border-r border-home-learning-track-progress-border">
          <Image src={LearningImage} width={92} alt="learning-image" />
          <div className="flex flex-col justify-between h-full w-[77%] ">
            <div>
              <p className="text-home-learning-track-default-color text-[18px]">
                Learning Track
              </p>
              <p className="text--home-learning-track-color font-next-book-bold text-[28px]">
                Solidity Learning Track
              </p>
            </div>
            <div className="w-full  text-[16px] text-home-learning-track-default-color">
              {leftRender()}
            </div>
          </div>
        </div>
        <div className="w-[31%] pl-[30px] h-full flex flex-col text-home-learning-track-default-color">
          <p className="text-[16px] font-next-book-bold">Next Up</p>
          <div className="flex-1 flex flex-col justify-between">
            {rightRender()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningTrackCard;
