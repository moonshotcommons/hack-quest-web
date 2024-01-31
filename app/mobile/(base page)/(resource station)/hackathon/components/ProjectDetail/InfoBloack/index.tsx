import { Typography } from 'antd';
import { FC } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
interface InfoBlockProps {
  title: string;
  description: string;
}

const InfoBlock: FC<InfoBlockProps> = ({ title, description }) => {
  return (
    <>
      <p className="font-next-poster-Bold text-[28px] tracking-[1.68px]">
        {title}
      </p>
      <Typography.Paragraph
        ellipsis={{
          rows: 3,
          expandable: true,
          symbol: (
            <span className="flex items-center justify-end font-next-book text-[18px]  leading-[125%] tracking-[0.36px] text-neutral-black">
              <span>{`Show More`}</span>
              <MdKeyboardArrowDown size={24} />
            </span>
          )
        }}
        className="font-next-book text-[21px] leading-[160%] tracking-[0.42px] text-neutral-black"
      >
        {description}
      </Typography.Paragraph>
    </>
  );
};

export default InfoBlock;
