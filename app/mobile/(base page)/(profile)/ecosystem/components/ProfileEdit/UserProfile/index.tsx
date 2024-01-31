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
      <div className="absolute -top-[110px] left-[30px] h-[170px] w-[170px] rounded-full">
        <Image
          src={profile.profileImage}
          alt="profileImage"
          fill
          className="object-cover"
        ></Image>
      </div>
      <div
        className={cn(
          'h-full rounded-b-[10px] px-[30px] pb-[35px] pt-[80px] font-next-book transition-shadow duration-200'
        )}
      >
        <div className="mb-[30px] flex flex-col gap-[10px]">
          <div className="whitespace-pre-wrap font-next-poster-Bold text-[28px] leading-normal tracking-[1.68px] text-neutral-black">
            {profile.name}
          </div>
          <div className="flex items-center gap-[15px]">
            <div className="text-neutral-black">Official Website</div>
            <div
              className="flex cursor-pointer items-center gap-[10px]"
              onClick={() => {
                BurialPoint.track('ecosystem-profile-Official Website点击');
                window.open(profile.website);
              }}
            >
              <span className="text-neutral-medium-gray">
                {profile.website}
              </span>
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
        <div className="line-clamp-3 w-[64%] text-neutral-black">
          {profile.description}
        </div>
        <div className="mt-[30px] flex h-[126px]">
          <div className="flex h-full w-[265px] flex-col items-center justify-between border-r-[0.5px] border-r-[#000] pr-[31px]">
            <p className="font-next-book-Thin text-[54px] leading-[86px] text-neutral-black">
              {separationNumber(profile.courseCount, 10000)}
            </p>
            <p className="text-neutral-medium-gray">Total Courses</p>
          </div>
          {/* <div className="h-full w-[295px] px-[31px] flex flex-col justify-between items-center border-r-[0.5px] border-r-[#000]">
            <p className="text-neutral-black text-[54px] leading-[86px] font-next-book-Thin">
              {separationNumber(100000, 10000)}
            </p>
            <p className="text-neutral-medium-gray">Total Views</p>
          </div> */}
          <div className="flex h-full w-[265px] flex-col items-center justify-between pl-[31px] ">
            <p className="font-next-book-Thin text-[54px] leading-[86px] text-neutral-black">
              {separationNumber(profile.learnCount, 10000)}
            </p>
            <p className="text-neutral-medium-gray">Total Learners</p>
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
