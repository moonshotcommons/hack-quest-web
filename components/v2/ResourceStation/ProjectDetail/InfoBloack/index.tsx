import { Typography } from 'antd';
import { FC, ReactNode } from 'react';
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
            <span className="font-next-book text-[#0b0b0b] text-[18px] tracking-[0.36px] leading-[125%]  flex items-center justify-end">
              <span>{`Show More`}</span>
              <MdKeyboardArrowDown size={24} />
            </span>
          )
        }}
        className="font-next-book text-[21px] tracking-[0.42px] leading-[160%] text-[#0b0b0b]"
      >
        {description}
      </Typography.Paragraph>
    </>
  );
};

export default InfoBlock;
