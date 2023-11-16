import Button from '@/components/v2/Common/Button';
import Image from 'next/image';
import { FC, ReactNode, useContext, useRef, useState } from 'react';
import { RiShareBoxLine } from 'react-icons/ri';
import EditButton from '../EditButton';
import { cn } from '@/helper/utils';
import BasicInfoModal, { BasicInfoModalRef } from '../BasicInfoModal';
import AvatarUpload from '../AvatarUpload';
import Tooltip from '@/components/v2/Common/Tooltip';
import { ProfileContext } from '../../type';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
interface UserProfileProps {
  edit?: boolean;
}

const UserProfile: FC<UserProfileProps> = (props) => {
  const { edit = false } = props;
  const basicInfoEditor = useRef<BasicInfoModalRef>(null);
  const [showEditIcon, setShowEditIcon] = useState(false);

  const { profile } = useContext(ProfileContext);
  const userInfo = useGetUserInfo();

  return (
    <div className="relative z-50">
      <div className="absolute w-[170px] h-[170px] rounded-full -top-[110px] left-[30px]">
        <AvatarUpload edit={edit}></AvatarUpload>
      </div>
      <div
        className={cn(
          'pt-[80px] font-next-book px-[30px] pb-[35px] transition-shadow duration-200 rounded-b-[10px]',
          showEditIcon ? 'shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)]' : ''
        )}
        onMouseEnter={() => {
          if (edit) {
            setShowEditIcon(true);
          }
        }}
        onMouseLeave={() => setShowEditIcon(false)}
      >
        {showEditIcon && (
          <div
            className="absolute right-[30px] top-[68px]"
            onClick={() => basicInfoEditor.current?.onEdit({})}
          >
            <Tooltip
              title="Edit your basic information"
              placement="bottomRight"
            >
              <EditButton className="bg-[#F4F4F4]"></EditButton>
            </Tooltip>
          </div>
        )}
        <div className="font-next-poster-Bold text-[28px] tracking-[1.68px] text-[#0B0B0B] leading-normal">
          {userInfo?.name}
        </div>
        <div className="mt-[10px] text-[18px] leading-[120%] text-[#8C8C8C]">
          {userInfo?.email}
        </div>
        <div className="flex gap-x-[15px] mt-[31.5px] items-center">
          <span className="text-[21px] tracking-[0.42px] leading-[160%] text-[#8C8C8C]">
            Location:
          </span>
          <span className="text-[21px] tracking-[0.063px] leading-[160%] text-black">
            {profile.location || '-'}
          </span>
        </div>
        <div className="flex gap-x-[15px] mt-[13px] items-center">
          <span className="text-[21px] tracking-[0.42px] leading-[160%] text-[#8C8C8C]">
            Experience:
          </span>
          <span className="text-[21px] tracking-[0.063px] leading-[160%] text-black">
            {`${profile.experience || 0} Years`}
          </span>
        </div>
        <div className="flex gap-x-[15px] mt-[11.5px] items-center">
          <span className="text-[21px] tracking-[0.42px] leading-[160%] text-[#8C8C8C]">
            Tech Stack:
          </span>
          <div className="flex gap-x-[10px]">
            {profile.techStack?.length > 0 &&
              profile.techStack.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="px-[14px] py-[3px] rounded-[10px] border border-[#3E3E3E] bg-[#F4F4F4] relative overflow-hidden text-[16px] text-[#0B0B0B] leading-[160%] tracking-[0.32px]"
                  >
                    {item}
                  </div>
                );
              })}
            {!profile.techStack?.length && '-'}
          </div>
        </div>
      </div>
      {/* <div className="absolute right-[30px] bottom-[41px]">
        <Button
          type="primary"
          icon={<RiShareBoxLine />}
          iconPosition="right"
          className="py-[16px] px-[102px] font-next-book text-[18px] leading-[125%] tracking-[0.36px]"
        >
          Share
        </Button>
      </div> */}
      <BasicInfoModal ref={basicInfoEditor}></BasicInfoModal>
    </div>
  );
};

export default UserProfile;
