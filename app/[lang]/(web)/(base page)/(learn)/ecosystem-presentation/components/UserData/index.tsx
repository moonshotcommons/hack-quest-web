import React from 'react';

interface UserDataProp {}

const UserData: React.FC<UserDataProp> = () => {
  return (
    <div className="flex justify-between gap-[40px] rounded-[8px] border border-neutral-light-gray bg-neutral-white px-[30px] py-[20px] ">
      <div className="body-l items-centertext-neutral-off-black flex">
        <span>Page View：</span>
        <span className="body-l-bold">11111</span>
      </div>
      <div className="body-l flex items-center  text-neutral-off-black">
        <span>User Started：</span>
        <span className="body-l-bold">11111</span>
      </div>
    </div>
  );
};

export default UserData;
