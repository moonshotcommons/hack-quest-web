import EmailFillIcon from '@/components/Common/Icon/EmailFill';
import UserFillIcon from '@/components/Common/Icon/UserFill';
import Modal from '@/components/Common/Modal';
import { BurialPoint } from '@/helper/burialPoint';

import { FC } from 'react';
import AvatarUpload from './AvatarUpload';
import ChangePassword from './ChangePassword';
import { useUserStore } from '@/store/zustand/userStore';
import { LoginResponse } from '@/service/webApi/user/type';

interface SettingsProps {
  // children: ReactNode;
}

const Settings: FC<SettingsProps> = (props) => {
  const settingsOpen = useUserStore((state) => state.settingsOpen);
  const setSettingsOpen = useUserStore((state) => state.setSettingsOpen);
  const userInfo = useUserStore((state) => state.userInfo);
  const onClose = () => {
    setSettingsOpen(false);
  };

  return (
    <div>
      <Modal
        open={settingsOpen}
        onClose={onClose}
        showCloseIcon={true}
        className="w-full max-w-[74.0625rem] text-neutral-off-white"
      >
        <div className="relative w-full m-auto py-[7.81rem] rounded-[2.5rem] bg-setting-drop-card-bg border  border-setting-drop-setting-modal-border z-[99] flex justify-center">
          <div className="flex flex-col w-[64%]">
            <h1 className="text-setting-drop-user-name-color text-[40px] font-next-poster-Bold leading-[110%] tracking-[0.04rem]">
              Settings
            </h1>
            <div className="mt-[4rem] flex flex-col gap-[1.5rem] ">
              <AvatarUpload userInfo={userInfo as LoginResponse}></AvatarUpload>
              <div
                className="w-full relative flex flex-col gap-[0.25rem] bottom-line"
                onClick={() => {
                  BurialPoint.track('想要修改用户名');
                }}
              >
                <span className="text-setting-drop-setting-input-label text-[0.875rem] font-next-book leading-[110%]">
                  ID
                </span>
                <div className="h-[3.5rem] flex gap-[1.25rem] items-center">
                  <span className="text-setting-input-icon-color">
                    <UserFillIcon color="currentColor" size={24}></UserFillIcon>
                  </span>
                  <input
                    type="text"
                    disabled
                    defaultValue={userInfo?.nickname}
                    className="bg-transparent h-full text-setting-drop-user-name-color text-[1rem] font-next-book leading-[120%] outline-none w-full disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div
                className="w-full relative flex flex-col gap-[0.25rem] bottom-line"
                onClick={() => {
                  BurialPoint.track('想要修改邮箱');
                }}
              >
                <span className="text-setting-drop-setting-input-label text-[0.875rem] font-next-book leading-[110%]">
                  Email
                </span>
                <div className="h-[3.5rem] flex gap-[1.25rem] items-center">
                  <span className="text-setting-input-icon-color">
                    <EmailFillIcon
                      color="currentColor"
                      size={24}
                    ></EmailFillIcon>
                  </span>
                  <input
                    type="text"
                    disabled
                    defaultValue={userInfo?.email}
                    className="bg-transparent h-full text-setting-drop-user-name-color text-[1rem] font-next-book leading-[120%] outline-none w-full disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <ChangePassword></ChangePassword>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
