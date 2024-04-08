import React from 'react';

interface PressKitProp {
  params: { id: string };
}

const PressKit: React.FC<PressKitProp> = ({ params }) => {
  console.info(params);
  return <div>PressKit</div>;
};

export default PressKit;
