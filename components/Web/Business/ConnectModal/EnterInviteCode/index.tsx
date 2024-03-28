import Input from '@/components/Common/Input';
import { HACKQUEST_TWITTER } from '@/constants/links';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { Lang, TransNs } from '@/i18n/config';
import { cn } from '@/helper/utils';
import { ParticipationStatus } from '../constant';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';

export interface TwitterConnectState {
  type: ParticipationStatus.INVITE_CODE;
  isConnect: boolean;
  connectInfo: {};
}

interface EnterInviteCodeProps<T> {
  refreshConnectState: () => Promise<unknown>;
  connectState: T;
}

const EnterInviteCode = <T,>(props: EnterInviteCodeProps<T>) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { connectState: propConnectState, refreshConnectState } = props;
  const connectState = propConnectState as TwitterConnectState;

  const [formData, setFormData] = useState<{
    inviteCode: string;
  }>({
    inviteCode: ''
  });

  const [formState, setFormState] = useState({
    inviteCode: {
      status: 'default',
      errorMessage: ''
    }
  });

  const verifyInviteCode = () => {
    if (!formData.inviteCode) {
      setFormState({
        ...formState,
        inviteCode: {
          status: 'error',
          errorMessage: 'Please enter the invite code'
        }
      });
      return false;
    }

    if (formData.inviteCode.length > 40) {
      setFormState({
        ...formState,
        inviteCode: {
          status: 'error',
          errorMessage: 'The length of the invite code should be 40 or less'
        }
      });
      return false;
    }

    if (!/^[\w%&!#-_?@]+$/g.test(formData.inviteCode)) {
      setFormState({
        ...formState,
        inviteCode: {
          status: 'error',
          errorMessage: 'Invite code can only be letters, numbers, %&*! Etc.'
        }
      });
      return false;
    }

    return true;
  };

  const { run: checkInviteCode, loading: checkLoading } = useRequest(
    async () => {
      const res = await webApi.userApi.checkInviteCode(formData.inviteCode);
      return res;
    },
    {
      onSuccess(res) {
        if (res.valid) {
        } else {
          setFormState({
            ...formState,
            inviteCode: {
              status: 'error',
              errorMessage: 'Invalid invite code'
            }
          });
        }
      },
      onError(e: any) {
        errorMessage(e);
      },
      manual: true,
      debounceWait: 500
    }
  );

  return (
    <div className="flex flex-col gap-8 py-[32px]">
      <h3 className="text-h3 text-neutral-rich-gray">{t('inputInviteCode')}</h3>
      <div className="body-m flex items-center gap-4 rounded-[16px] bg-neutral-off-white p-4 text-neutral-off-black">
        <div className={cn('flex flex-col', lang === Lang.ZH ? '' : 'gap-4')}>
          <p>{t('inputInviteCodeDesc')}</p>
          <div className="flex">
            <span>{t('noInviteCodeDesc')}</span>
            <Link href={HACKQUEST_TWITTER} target="_blank" className="body-m flex cursor-pointer items-center gap-2 text-neutral-off-black">
              <span className="relative after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
                {t('goTwitter')}
              </span>
              <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 3.5L10 8.79412L2.5 14.0882"
                  stroke="#131313"
                  strokeWidth="1.76471"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
        <svg width="59" height="34" viewBox="0 0 59 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M42.0597 33C50.8634 33 58.0003 25.8366 58.0003 17C58.0003 8.16344 50.8634 1 42.0597 1C33.256 1 26.1191 8.16344 26.1191 17C26.1191 25.8366 33.256 33 42.0597 33Z"
            fill="white"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42.061 28.5609C48.4222 28.5609 53.579 23.3849 53.579 16.9999C53.579 10.615 48.4222 5.43896 42.061 5.43896C35.6998 5.43896 30.543 10.615 30.543 16.9999C30.543 23.3849 35.6998 28.5609 42.061 28.5609Z"
            fill="#EDEDED"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 6"
          />
          <path
            d="M26.8024 2.15332H9.72342L1.18262 17.0001L9.72342 31.8469H26.8024L35.3432 17.0001L26.8024 2.15332Z"
            fill="white"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.0425 6.95044H12.4825L6.70117 17.0001L12.4825 27.0498H24.0425L29.8211 17.0001L24.0425 6.95044Z"
            fill="#FFE866"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 6"
          />
        </svg>
      </div>
      <div className="[&>div]:gap-[10px]">
        <Input
          label={t('inputAnInviteCode') + '*'}
          type="text"
          name="invite code"
          labelClassName="text-neutral-medium-gray body-l font-normal"
          placeholder={t('inputAnInviteCode')}
          className="body-m"
          state={formState.inviteCode.status as any}
          errorMessage={formState.inviteCode.errorMessage}
          delay={500}
          clear
          theme={'light'}
          onChange={(e) => {
            setFormData({
              ...formData,
              inviteCode: e.target.value
            });
            setFormState({
              ...formState,
              inviteCode: {
                status: 'default',
                errorMessage: ''
              }
            });
          }}
        ></Input>
      </div>
    </div>
  );
};

export default EnterInviteCode;
