import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Checkbox from '@/components/v2/Common/Checkbox';
import Input from '@/components/v2/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useValidator } from '@/hooks/useValidator';
import webApi from '@/service';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useDebounceFn, useRequest } from 'ahooks';
import { message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import WhiteListModal from '../WhiteListModal';
import { useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import ContractUs from '../../Landing/ContractUs';
import DarkInstagramIcon from '@/components/Common/Icon/DarkInstagram';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import DiscordIcon from '@/components/Common/Icon/Discord';
import { AuthType } from '@/service/webApi/user/type';
import { setUserInfo } from '@/store/redux/modules/user';
import { setToken } from '@/helper/user-token';
import { omit } from 'lodash-es';

interface CheckInviteCodeProps {}

const CheckInviteCode: FC<CheckInviteCodeProps> = (props) => {
  const loginRouteParams = useGetUserUnLoginType();
  const router = useRouter();
  const [formData, setFormData] = useState<{
    email: string;
    inviteCode: string;
    token: string;
  }>({
    email: '',
    inviteCode: '',
    token: ''
  });

  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    inviteCode: {
      status: 'default',
      errorMessage: ''
    }
  });

  const { run: emailVerify, loading: emailLoading } = useRequest(
    async () => {
      const res = await webApi.userApi.checkInviteCode(formData.inviteCode);
      return res;
    },
    {
      onSuccess(res) {
        if (res.valid) {
          dispatch(
            setUnLoginType({
              type: UnLoginType.SIGN_UP,
              params: {
                codeVerify: true,
                email: formData.email,
                inviteCode: formData.inviteCode
              }
            })
          );
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
        if (e.msg) {
          message.error(e.msg);
        } else {
          message.error(e.message);
        }
      },
      manual: true,
      debounceWait: 500
    }
  );
  const { run: thirdPartyVerify, loading: thirdPartyLoading } = useRequest(
    async () => {
      const res = await webApi.userApi.checkInviteCodeByThirdParty(
        formData.inviteCode,
        formData.token
      );
      return res;
    },
    {
      onSuccess(res) {
        dispatch(setUserInfo(omit(res, 'token')));
        BurialPoint.track('signup-Google三方登录输入邀请码登录成功');
        setToken(res.token);
        router.push('/home');
      },
      onError(e: any) {
        let msg = '';
        if (e.msg) {
          message.error(e.msg);
          msg = e.msg;
        } else {
          message.error(e.message);
          msg = e.message;
        }

        setFormState({
          ...formState,
          inviteCode: {
            status: 'error',
            errorMessage: msg
          }
        });
      },
      manual: true,
      debounceWait: 500
    }
  );

  useEffect(() => {
    if (loginRouteParams.params) {
      setFormData({
        ...formData,
        email: loginRouteParams.params.email,
        token: loginRouteParams.params?.token || ''
      });
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-[25px]">
        <h1 className="text-[#FFF] text-[32px] font-next-book leading-[125%] tracking-[0.64px]">
          Got an Invite Code?
        </h1>
        <div className="text-[#FFF] text-[14px] font-next-book leading-[160%] -tracking-[0.154px]">
          HackQuest is currently in beta. Get an invite code from an existing
          user to sign up.
        </div>

        <div className="text-white">
          <Input
            label="Invite Code"
            type="text"
            name="invite code"
            placeholder="Enter your invite code"
            className="bg-[#212121] text-white"
            // description="Use 8 or more characters with a mix of letters & numbers"
            state={formState.inviteCode.status as any}
            errorMessage={formState.inviteCode.errorMessage}
            delay={500}
            // rules={{
            //   type: 'string',
            //   required: true,
            //   len: 10
            // }}
            onChange={(e) => {
              setFormData({
                ...formData,
                inviteCode: e.target.value
              });
            }}
          ></Input>
        </div>

        <Button
          onClick={() => {
            if (loginRouteParams.params?.registerType === AuthType.EMAIL) {
              emailVerify();
            } else {
              thirdPartyVerify();
            }
          }}
          block
          icon={<RightArrowIcon></RightArrowIcon>}
          iconPosition="right"
          className="
          font-next-book
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
        >
          Next
        </Button>
        <Button
          onClick={() => {
            router.push('/');
            dispatch(setUnLoginType(UnLoginType.LOGIN));
          }}
          block
          disabled={emailLoading}
          className={cn(
            `font-next-book
          text-[1.125rem]
          border
          bg-transparent
          text-white hover:text-auth-ghost-button-text-hover-color
          border-white hover:border-auth-ghost-button-border-hover-color`,
            emailLoading ? 'cursor-not-allowed opacity-70' : ''
          )}
        >
          Back
        </Button>
        <div className="py-[12px] flex justify-between items-center">
          <div className="h-[1px] w-[20.5%] bg-white"></div>
          <span className="text-[#FFF] text-[14px] font-next-book tracking-[0.28px]">
            Don’t have an invite code?
          </span>
          <div className="h-[1px] w-[20.5%] bg-white"></div>
        </div>
        <p className="text-[#FFF] text-[14px] font-next-book leading-[160%] tracking-[0.28px] text-center">
          Follow HackQuest on social media for latest updates:
        </p>
        <ContractUs className="gap-[30px] justify-center"></ContractUs>
      </div>
      {/* <WhiteListModal
        open={showWhiteListModal}
        onClose={() => setShowWhiteListModal(false)}
      ></WhiteListModal> */}
    </div>
  );
};

export default CheckInviteCode;
