import { computeTime } from '@/helper/formate';
import { FC, ReactNode } from 'react';

interface DurationTagProps {
  icon?: ReactNode;
  label?: ReactNode;
  value?: string;
  valueNode?: ReactNode;
}

const defaultIcon = (
  <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.019 2.72224C23.8634 2.74004 30.2423 9.13459 30.2245 16.9623C30.2067 24.8066 23.8122 31.1845 15.9834 31.1667C8.13904 31.1489 1.76007 24.7543 1.77787 16.9267C1.79567 9.0834 8.19022 2.70443 16.019 2.72224ZM28.0136 16.9344C28.0014 10.2996 22.6127 4.92088 15.9912 4.93312C9.3563 4.94536 3.97652 10.3341 3.98876 16.9545C4.001 23.5894 9.38968 28.968 16.0112 28.9558C22.6461 28.9436 28.0259 23.5549 28.0136 16.9344Z"
      fill="#3E3E3E"
    />
    <path
      d="M14.8942 13.7143C14.8942 12.6417 14.8875 11.568 14.8965 10.4954C14.9031 9.65419 15.6375 9.11788 16.3852 9.39271C16.8492 9.56295 17.1073 9.97353 17.1084 10.5577C17.1096 12.417 17.1151 14.2762 17.1018 16.1355C17.0995 16.397 17.183 16.5494 17.39 16.7019C18.5961 17.5909 19.7889 18.4966 20.9895 19.3934C21.3989 19.6994 21.5959 20.0944 21.4724 20.5996C21.2821 21.3785 20.3975 21.6867 19.7299 21.2026C18.9666 20.6485 18.2189 20.0733 17.4645 19.5069C16.8058 19.0129 16.1549 18.5089 15.4862 18.0293C15.0634 17.7255 14.8842 17.3361 14.8898 16.822C14.9031 15.7861 14.8931 14.7502 14.8942 13.7132V13.7143Z"
      fill="#3E3E3E"
    />
  </svg>
);

const DurationTag: FC<DurationTagProps> = ({ icon, label, value, valueNode }) => {
  return (
    <div className="flex items-center gap-3">
      {icon ? icon : defaultIcon}
      <div className="flex flex-col">
        {!!label && label}
        {!label && <span className="body-xs text-neutral-medium-gray">Total Length</span>}
        {!!valueNode && valueNode}
        {!valueNode && value && <span className="body-m-bold lowercase">{computeTime(Number(value), 'Hour', false)}h</span>}
      </div>
    </div>
  );
};

export default DurationTag;
