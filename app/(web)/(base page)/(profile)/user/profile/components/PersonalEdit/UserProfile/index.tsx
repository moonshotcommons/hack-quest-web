import AvatarUpload from '@/components/Web/Business/AvatarUpload';
import HoverIcon from '@/components/Web/Business/HoverIcon';
import { IconType } from '@/components/Web/Business/HoverIcon/type';
import { cn } from '@/helper/utils';
import { FC, useContext, useRef, useState } from 'react';
import { ProfileContext } from '../../../constants/type';
import BasicInfoModal, { BasicInfoModalRef } from '../BasicInfoModal';
interface UserProfileProps {
  edit?: boolean;
}

const UserProfile: FC<UserProfileProps> = (props) => {
  const { edit = false } = props;
  const basicInfoEditor = useRef<BasicInfoModalRef>(null);
  const [showEditIcon, setShowEditIcon] = useState(false);

  const { profile } = useContext(ProfileContext);

  return (
    <div className="relative z-50 h-full">
      <div className="absolute -top-[110px] left-[30px] h-[170px] w-[170px] rounded-full">
        <AvatarUpload edit={edit}></AvatarUpload>
      </div>
      <div
        className={cn(
          'h-full rounded-b-[10px] px-[30px] pb-[35px] pt-[80px] font-next-book transition-shadow duration-200',
          showEditIcon ? 'shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)]' : ' '
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
            <HoverIcon
              type={IconType.EDIT}
              tooltip="Edit your basic information"
              tooltipProps={{
                placement: 'bottomRight'
              }}
            ></HoverIcon>
          </div>
        )}
        <div className="whitespace-pre-wrap font-next-poster-Bold text-[28px] leading-normal tracking-[1.68px] text-neutral-black">
          {profile.user?.nickname}
        </div>
        <div className="mt-[10px] whitespace-pre-line text-[18px] leading-[120%] text-neutral-medium-gray">
          {profile.user?.email}&nbsp;
        </div>
        <div className="mt-[31.5px] flex items-center gap-x-[15px]">
          <span className="text-[21px] leading-[160%] tracking-[0.42px] text-neutral-medium-gray">
            Location:
          </span>
          <span className="text-[21px] leading-[160%] tracking-[0.063px] text-neutral-black">
            {profile.location || '-'}
          </span>
        </div>
        <div className="mt-[13px] flex items-center gap-x-[15px]">
          <span className="text-[21px] leading-[160%] tracking-[0.42px] text-neutral-medium-gray">
            Experience:
          </span>
          <span className="text-[21px] leading-[160%] tracking-[0.063px] text-neutral-black">
            {`${profile.experience || 0} Years`}
          </span>
        </div>
        <div className="mt-[11.5px] flex items-start gap-x-[15px]">
          <span className="whitespace-nowrap text-[21px] leading-[160%] tracking-[0.42px] text-neutral-medium-gray">
            Tech Stack:
          </span>
          <div className="flex flex-wrap gap-[10px]">
            {profile.techStack?.length > 0 &&
              profile.techStack.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-[10px] border border-neutral-rich-gray bg-neutral-off-white px-[14px] py-[3px] text-[16px] leading-[160%] tracking-[0.32px] text-neutral-black"
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
