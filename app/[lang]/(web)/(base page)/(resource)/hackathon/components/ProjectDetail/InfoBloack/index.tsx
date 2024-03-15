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
      <p className="text-h3">{title}</p>
      <Typography.Paragraph
        ellipsis={{
          rows: 3,
          expandable: true,
          symbol: (
            <span className="body-l flex items-center justify-end text-neutral-black">
              <span>{`Show More`}</span>
              <MdKeyboardArrowDown size={24} />
            </span>
          )
        }}
        className="body-l text-neutral-black"
      >
        {description}
      </Typography.Paragraph>
    </>
  );
};

export default InfoBlock;
