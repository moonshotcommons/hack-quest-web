import Image from 'next/image';
import { GithubIcon } from '@/components/ui/icons/github';
import { LinkedInIcon } from '@/components/ui/icons/linkedin';
import { LocationIcon } from '@/components/ui/icons/location';
import { TelegramIcon } from '@/components/ui/icons/telegram';
import { TwitterIcon } from '@/components/ui/icons/twitter';
import { WeChatIcon } from '@/components/ui/icons/wechat';
import { Skeleton } from '@/components/shared/skeleton';
import { useProfile } from '../utils';
import { ShareProfile } from '../modals/share-profile-modal';
import { EditProfile } from '../modals/edit-profile-modal';
import { CropImageModal, useCropImage } from '../modals/crop-image-modal';
import { FileInput } from '../common/file-input';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { message } from 'antd';

export function BasicInfo() {
  const { loading, data: profile, invalidate } = useProfile();
  const { onOpen, onClose } = useCropImage();

  const uploadAvatarMutation = useMutation({
    mutationFn: (data: FormData) => webApi.userApi.uploadAvatar(data),
    onSuccess: async () => {
      await invalidate();
      onClose();
      message.success('Upload avatar successfully');
    }
  });

  function onConfirm(blob: Blob) {
    const formData = new FormData();
    formData.append('file', blob, 'avatar.png');
    uploadAvatarMutation.mutate(formData);
  }

  return (
    <div className="h-full w-full bg-neutral-white">
      <div className="relative h-20 w-full sm:h-[210px]">
        <Image src={profile?.backgroundImage || '/images/user/default-bg.png'} alt="background image" fill />
      </div>
      <div className="relative mx-auto max-w-5xl bg-neutral-white px-6 pb-4 sm:px-0 sm:pb-0">
        <div className="absolute -top-6 left-5 h-20 w-20 rounded-full border-4 border-neutral-white bg-neutral-white sm:-top-8 sm:left-0 sm:h-40 sm:w-40">
          <Skeleton loading={loading} className="rounded-full">
            <div className="group relative h-full w-full">
              <Image src={profile?.user?.avatar || ''} alt="avatar" fill className="rounded-full" />
              <FileInput
                className="absolute inset-0 rounded-full bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                onFileChange={onOpen}
              />
            </div>
          </Skeleton>
        </div>
        <div className="flex flex-col gap-3 pt-16 sm:ml-[192px] sm:gap-4 sm:pt-10">
          <Skeleton loading={loading} className="h-8 w-20 rounded">
            <h1 className="text-lg font-bold text-neutral-off-black sm:text-2xl">{profile?.user?.nickname}</h1>
          </Skeleton>
          <Skeleton loading={loading} className="h-6 w-40 rounded">
            <p className="text-sm text-neutral-medium-gray sm:text-base">
              one line intro colorless green idea sleeps furiously
            </p>
          </Skeleton>
          <Skeleton loading={loading} className="h-6 w-32 rounded">
            <div className="flex items-center gap-1 text-sm text-neutral-medium-gray sm:text-base">
              <LocationIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>{profile?.location}</span>
            </div>
          </Skeleton>
          <div className="flex items-center gap-4">
            <TwitterIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            <LinkedInIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            <TelegramIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            <GithubIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            <WeChatIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="flex items-center gap-2.5">
            {profile?.techStack?.map((tech) => (
              <span key={tech} className="rounded-[8px] bg-neutral-off-white px-3.5 py-[3px] text-sm sm:text-base">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute right-5 top-6 flex items-center gap-4 sm:right-0 sm:top-10">
          <EditProfile />
          <ShareProfile />
        </div>
      </div>
      <CropImageModal loading={uploadAvatarMutation.isPending} onConfirm={onConfirm} />
    </div>
  );
}
