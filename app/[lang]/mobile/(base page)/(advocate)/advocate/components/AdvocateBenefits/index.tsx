import { FC } from 'react';
import Card from './Card';
import { dataList } from './constant';

interface AdvocateBenefitsProps {}

const AdvocateBenefits: FC<AdvocateBenefitsProps> = (props) => {
  return (
    <div className="container mx-auto mt-[100px] flex flex-col items-center">
      <h2 className="text-h2 text-neutral-off-black">Benefits of Being An Advocate 🎁</h2>
      <div className="mt-[3.75rem] flex w-full cursor-pointer flex-wrap gap-10">
        {dataList.map((item, index) => {
          return (
            <Card key={index} title={item.title} description={item.description} icon={item.icon} iconClassName={item.iconClassName}></Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdvocateBenefits;
