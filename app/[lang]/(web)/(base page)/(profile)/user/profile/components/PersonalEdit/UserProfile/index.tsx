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
          'h-full rounded-b-[10px] px-[30px] pb-[35px] pt-[80px] transition-shadow duration-200',
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
        <div className="text-h3 whitespace-pre-wrap text-neutral-black">
          {profile.user?.nickname}
        </div>
        <div className="body-l mt-[10px] whitespace-pre-line text-neutral-medium-gray">
          {profile.user?.email}&nbsp;
        </div>
        <div className="mt-[31.5px] flex items-center gap-x-[15px]">
          <span className="body-l text-neutral-medium-gray">Location:</span>
          <span className="body-l text-neutral-black">
            {profile.location || '-'}
          </span>
        </div>
        <div className="mt-[13px] flex items-center gap-x-[15px]">
          <span className="body-l text-neutral-medium-gray">Experience:</span>
          <span className="body-l text-neutral-black">
            {`${profile.experience || 0} Years`}
          </span>
        </div>
        <div className="mt-[11.5px] flex items-start gap-x-[15px]">
          <span className="body-l whitespace-nowrap text-neutral-medium-gray">
            Tech Stack:
          </span>
          <div className="flex flex-wrap gap-[10px]">
            {profile.techStack?.length > 0 &&
              profile.techStack.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="body-m relative overflow-hidden rounded-[10px] border border-neutral-rich-gray bg-neutral-off-white px-[14px] py-[3px] text-neutral-black"
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
          className="py-[16px] px-[102px] body-l"
        >
          Share
        </Button>
      </div> */}
      <BasicInfoModal ref={basicInfoEditor}></BasicInfoModal>
    </div>
  );
};

export default UserProfile;
