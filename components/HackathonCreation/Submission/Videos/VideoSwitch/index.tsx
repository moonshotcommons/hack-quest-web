import { Switch } from '@/components/ui/switch';
import { FC } from 'react';

interface VideoSwitchProps {
  videoType: 'upload' | 'link';
  setVideoType: (type: 'upload' | 'link') => void;
}

const VideoSwitch: FC<VideoSwitchProps> = ({ videoType, setVideoType }) => {
  return (
    <Switch
      className="h-[1.625rem] w-[3.5rem] data-[state=checked]:bg-neutral-off-white data-[state=unchecked]:bg-neutral-off-white"
      innerClassName="data-[state=checked]:translate-x-[26px] bg-yellow-dark w-[1.625rem] h-[1.625rem]"
      checked={videoType === 'link'}
      onCheckedChange={(checked) => {
        if (checked) setVideoType('link');
        else setVideoType('upload');
      }}
    >
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between">
        <span className="px-[7px]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.01128 4.46159C2.00097 4.59381 2.0436 4.7247 2.1298 4.82548C2.21599 4.92627 2.3387 4.98869 2.47091 4.999C2.60313 5.00932 2.73402 4.96669 2.8348 4.88048L5.4998 2.59048V8.50048C5.4998 8.77663 5.72366 9.00048 5.9998 9.00048C6.27594 9.00048 6.4998 8.77663 6.4998 8.50048V2.59048L9.1848 4.88048C9.39467 5.05998 9.71031 5.03535 9.8898 4.82548C10.0693 4.61562 10.0447 4.29998 9.8348 4.12048L6.3348 1.12048C6.30988 1.10257 6.28305 1.08748 6.2548 1.07548L6.1948 1.03548C6.07601 0.988172 5.9436 0.988172 5.8248 1.03548L5.7648 1.07548C5.73655 1.08748 5.70972 1.10257 5.6848 1.12048L2.1848 4.12048C2.08401 4.20668 2.0216 4.32938 2.01128 4.46159ZM10 9.00048C10 8.72434 10.2239 8.50048 10.5 8.50048C10.7761 8.50048 11 8.72434 11 9.00048V10.0005C10.9547 10.5902 10.4454 11.0349 9.855 11.0005H2.145C1.55458 11.0349 1.04533 10.5902 1 10.0005V9.00048C1 8.72434 1.22386 8.50048 1.5 8.50048C1.77614 8.50048 2 8.72434 2 9.00048V9.96548C2.04445 9.98959 2.09444 10.0017 2.145 10.0005H9.855C9.90556 10.0017 9.95555 9.98959 10 9.96548V9.00048Z"
              fill="#8C8C8C"
            />
          </svg>
        </span>
        <span className="px-[7px]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.5 8.5H3.5C2.80833 8.5 2.21875 8.25625 1.73125 7.76875C1.24375 7.28125 1 6.69167 1 6C1 5.30833 1.24375 4.71875 1.73125 4.23125C2.21875 3.74375 2.80833 3.5 3.5 3.5H5.5V4.5H3.5C3.08333 4.5 2.72917 4.64583 2.4375 4.9375C2.14583 5.22917 2 5.58333 2 6C2 6.41667 2.14583 6.77083 2.4375 7.0625C2.72917 7.35417 3.08333 7.5 3.5 7.5H5.5V8.5ZM4 6.5V5.5H8V6.5H4ZM6.5 8.5V7.5H8.5C8.91667 7.5 9.27083 7.35417 9.5625 7.0625C9.85417 6.77083 10 6.41667 10 6C10 5.58333 9.85417 5.22917 9.5625 4.9375C9.27083 4.64583 8.91667 4.5 8.5 4.5H6.5V3.5H8.5C9.19167 3.5 9.78125 3.74375 10.2688 4.23125C10.7563 4.71875 11 5.30833 11 6C11 6.69167 10.7563 7.28125 10.2688 7.76875C9.78125 8.25625 9.19167 8.5 8.5 8.5H6.5Z"
              fill="#131313"
            />
          </svg>
        </span>
      </div>
    </Switch>
  );
};

export default VideoSwitch;
