import { cn, separationNumber } from '@/helper/utils';
import { FC } from 'react';
import Image from 'next/image';
import { RiShareBoxLine } from 'react-icons/ri';
import { getThirdPartyMedia, thirdPartyMedia } from '@/helper/thirdPartyMedia';
import { BurialPoint } from '@/helper/burialPoint';
import { EcosystemProfileType } from '@/service/webApi/elective/type';
interface UserProfileProps {
  profile: EcosystemProfileType;
}

const UserProfile: FC<UserProfileProps> = ({ profile }) => {
  return (
    <div className="relative z-50">
      <div className="absolute w-[170px] h-[170px] rounded-full -top-[110px] left-[30px]">
        <Image
          src={profile.profileImage}
          alt="profileImage"
          fill
          className="object-cover"
        ></Image>
      </div>
      <div
        className={cn(
          'pt-[80px] font-next-book px-[30px] pb-[35px] transition-shadow duration-200 rounded-b-[10px] h-full'
        )}
      >
        <div className="flex flex-col gap-[10px] mb-[30px]">
          <div className="font-next-poster-Bold text-[28px] tracking-[1.68px] text-[#0B0B0B] leading-normal whitespace-pre-wrap">
            {profile.name}
          </div>
          <div className="flex items-center gap-[15px]">
            <div className="text-[#000]">Official Website</div>
            <div
              className="flex items-center gap-[10px] cursor-pointer"
              onClick={() => {
                BurialPoint.track('profile-Official Website点击');
                window.open(profile.website);
              }}
            >
              <span className="text-[#8C8C8C]">{profile.website}</span>
              <RiShareBoxLine />
            </div>
          </div>
          <div className="flex items-center gap-[20px]">
            {Object.keys(profile.links || {}).map((link, i) => {
              const newLink = link as keyof typeof thirdPartyMedia;
              return profile.links[newLink] ? (
                <div
                  key={i}
                  onClick={() => {
                    window.open(profile.links.twitter);
                  }}
                >
                  {getThirdPartyMedia(newLink).icon}
                </div>
              ) : null;
            })}
          </div>
        </div>
        <div className="text-[#000] w-[64%] line-clamp-3">
          {profile.description}
        </div>
        <div className="flex h-[126px] mt-[30px]">
          <div className="h-full w-[265px] pr-[31px] flex flex-col justify-between items-center border-r-[0.5px] border-r-[#000]">
            <p className="text-[#000] text-[54px] leading-[86px] font-next-book-Thin">
              {separationNumber(profile.courseCount, 10000)}
            </p>
            <p className="text-[#8C8C8C]">Total Courses</p>
          </div>
          {/* <div className="h-full w-[295px] px-[31px] flex flex-col justify-between items-center border-r-[0.5px] border-r-[#000]">
            <p className="text-[#000] text-[54px] leading-[86px] font-next-book-Thin">
              {separationNumber(100000, 10000)}
            </p>
            <p className="text-[#8C8C8C]">Total Views</p>
          </div> */}
          <div className="h-full w-[265px] pl-[31px] flex flex-col justify-between items-center ">
            <p className="text-[#000] text-[54px] leading-[86px] font-next-book-Thin">
              {separationNumber(profile.learnCount, 10000)}
            </p>
            <p className="text-[#8C8C8C]">Total Learners</p>
          </div>
        </div>

        {/* <Button
          type="primary"
          icon={<RiShareBoxLine />}
          iconPosition="right"
          className="py-[16px] px-[102px] font-next-book text-[18px] leading-[125%] tracking-[0.36px]"
        >
          Share
        </Button> */}
      </div>
    </div>
  );
};

export default UserProfile;
