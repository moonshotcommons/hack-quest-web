import { EditIcon } from '@/components/ui/icons/edit';
import { GithubIcon } from '@/components/ui/icons/github';
import { LinkedInIcon } from '@/components/ui/icons/linkedin';
import { ShareIcon } from '@/components/ui/icons/share';
import { TelegramIcon } from '@/components/ui/icons/telegram';
import { TwitterIcon } from '@/components/ui/icons/twitter';
import { WeChatIcon } from '@/components/ui/icons/wechat';
import Image from 'next/image';
import { BuilderScore } from './components/builder-score';
import { LocationIcon } from '@/components/ui/icons/location';

export default function Page() {
  return (
    <div className="h-full w-full bg-white">
      <div className="h-60 w-full bg-[url('/images/profile/profile-bg.png')] bg-cover bg-no-repeat grayscale-[50%]" />
      <div className="bg-white">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative">
            <div className="absolute -top-8 left-0 h-40 w-40 rounded-full border-4 border-neutral-white bg-neutral-white">
              <div className="relative h-full w-full">
                <Image src="/images/profile/avatar.png" alt="avatar" fill />
              </div>
            </div>
            <div className="ml-[192px] flex flex-col gap-4 pt-10">
              <h1 className="text-2xl font-bold text-neutral-off-black">Evan</h1>
              <p className="text-base text-neutral-medium-gray">one line intro colorless green idea sleeps furiously</p>
              <div className="flex items-center gap-1 text-neutral-medium-gray">
                <LocationIcon />
                <span>Beijing, China</span>
              </div>
              <div className="flex items-center gap-4">
                <TwitterIcon />
                <LinkedInIcon />
                <TelegramIcon />
                <GithubIcon />
                <WeChatIcon />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="body-m rounded-[8px] bg-neutral-off-white px-3.5 py-[3px]">Python</span>
                <span className="body-m rounded-[8px] bg-neutral-off-white px-3.5 py-[3px]">JavaScript</span>
                <span className="body-m rounded-[8px] bg-neutral-off-white px-3.5 py-[3px]">MongoDB</span>
                <span className="body-m rounded-[8px] bg-neutral-off-white px-3.5 py-[3px]">Ruby</span>
              </div>
            </div>
            <div className="absolute right-0 top-10 flex items-center gap-4">
              <button>
                <EditIcon />
              </button>
              <button>
                <ShareIcon />
              </button>
            </div>
          </div>
          <BuilderScore />
        </div>
      </div>
    </div>
  );
}
