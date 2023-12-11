import { cn } from '@/helper/utils';
import { FC, useState } from 'react';
import ComponentRenderer from '../Business/Renderer/MiniElectiveRenderer';
// import mockLessonData from './content.json';
// import mockLessonData from './quizA.json';
import mockLessonData from './quizB.json';
// import mockLessonData from './quizC.json';

interface MiniCoursePageProps {
  courseId: string;
}

const mockData = [
  {
    name: 'Web 3’s onboarding problem',
    state: 'ok'
  },
  {
    name: 'Creating a Seamless Wallet Onboarding Experience',
    state: 'learning'
  },
  {
    name: 'Quiz',
    state: 'lock'
  }
];

const MiniCoursePage: FC<MiniCoursePageProps> = (props) => {
  const { courseId } = props;
  console.log(mockLessonData);
  const [showList, setShowList] = useState(false);

  return (
    <div className="py-[40px] flex h-full">
      <div className="relative">
        <div
          className="absolute -top-2"
          onClick={() => {
            setShowList(!showList);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 18C2 17.4477 2.44772 17 3 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18Z"
              fill="black"
            />
          </svg>
        </div>
        <div
          className={cn('w-[352px] pr-[32px]', showList ? 'flex' : 'hidden')}
        >
          <ul className="py-[40px] flex flex-col gap-[16px]">
            {mockData.map((item, index) => {
              return (
                <li key={index}>
                  <div className="flex justify-between">
                    <span
                      className={cn(
                        'text-[#3E3E3E] text-[14px] font-next-book leading-[125%] tracking-[0.28px] pr-4',
                        item.state === 'learning'
                          ? 'font-next-book-bold text-[#212121]'
                          : '',
                        item.state === 'lock' ? 'text-[#8C8C8C]' : ''
                      )}
                    >{`${index + 1 < 10 ? '0' + (index + 1) : index + 1} ${
                      item.name
                    }`}</span>
                    {item.state === 'ok' && (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 9.59223L8.09524 15.6923L18 4"
                          stroke="#00C365"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    )}
                    {item.state === 'lock' && (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.16675 10C3.70651 10 3.33341 10.3731 3.33341 10.8333V16.6667C3.33341 17.1269 3.70651 17.5 4.16675 17.5H15.8334C16.2937 17.5 16.6667 17.1269 16.6667 16.6667V10.8333C16.6667 10.3731 16.2937 10 15.8334 10H4.16675ZM1.66675 10.8333C1.66675 9.45263 2.78604 8.33334 4.16675 8.33334H15.8334C17.2141 8.33334 18.3334 9.45263 18.3334 10.8333V16.6667C18.3334 18.0474 17.2141 19.1667 15.8334 19.1667H4.16675C2.78604 19.1667 1.66675 18.0474 1.66675 16.6667V10.8333Z"
                          fill="#8C8C8C"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 2.50001C9.11594 2.50001 8.2681 2.8512 7.64298 3.47632C7.01786 4.10144 6.66667 4.94929 6.66667 5.83334V9.16668C6.66667 9.62691 6.29357 10 5.83333 10C5.3731 10 5 9.62691 5 9.16668V5.83334C5 4.50726 5.52678 3.23549 6.46447 2.29781C7.40215 1.36013 8.67392 0.833344 10 0.833344C11.3261 0.833344 12.5979 1.36013 13.5355 2.29781C14.4732 3.23549 15 4.50726 15 5.83334V9.16668C15 9.62691 14.6269 10 14.1667 10C13.7064 10 13.3333 9.62691 13.3333 9.16668V5.83334C13.3333 4.94929 12.9821 4.10144 12.357 3.47632C11.7319 2.8512 10.8841 2.50001 10 2.50001Z"
                          fill="#8C8C8C"
                        />
                      </svg>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex-1 h-[calc(100vh-64px-80px)] flex flex-col justify-center items-center gap-[24px]">
        <div className="flex-1 w-full flex gap-[60px] h-[calc(100%-24px-6px)] justify-center items-center">
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="36" cy="36" r="35.5" stroke="#131313" />
            <path
              d="M31.5 27L23.031 35.469C22.9612 35.5387 22.9057 35.6214 22.8679 35.7126C22.8301 35.8037 22.8107 35.9013 22.8107 36C22.8107 36.0987 22.8301 36.1963 22.8679 36.2874C22.9057 36.3786 22.9612 36.4613 23.031 36.531L31.5 45M22.5 36H49.5"
              stroke="#3E3E3E"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="flex-1 max-w-[840px] bg-white h-full rounded-[12px] px-[64px] py-[48px] overflow-auto shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
            <h1 className="pb-[24px] text-[28px] font-next-poster-Bold text-[#131313] tracking-[1.68px]">
              {mockLessonData.name}
            </h1>
            <div className="h-[1px] scale-y-50 bg-black"></div>
            <ComponentRenderer
              parent={mockLessonData}
              component={mockLessonData.content as any}
            ></ComponentRenderer>
          </div>
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="36" cy="36" r="35.5" stroke="#131313" />
            <path
              d="M40.5 45L48.969 36.531C49.0388 36.4613 49.0943 36.3786 49.1321 36.2874C49.1699 36.1963 49.1893 36.0987 49.1893 36C49.1893 35.9013 49.1699 35.8037 49.1321 35.7126C49.0943 35.6214 49.0388 35.5387 48.969 35.469L40.5 27M49.5 36L22.5 36"
              stroke="#3E3E3E"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex gap-x-[10px] justify-center">
          {mockData.map((item, index) => {
            return (
              <div
                key={index}
                className={cn(
                  'h-[6px] w-10 rounded-[2px]',
                  item.state === 'ok' ? 'bg-[#FCC409]' : 'bg-[#DADADA]'
                )}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MiniCoursePage;
