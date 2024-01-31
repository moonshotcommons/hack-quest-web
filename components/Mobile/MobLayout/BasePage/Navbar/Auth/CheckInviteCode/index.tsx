import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Input from '@/components/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { FC, useEffect, useState } from 'react';

// import ContractUs from '@/app/(web)/(base page)/(landing)/components/ContractUs';
import { LoginResponse, ThirdPartyAuthType } from '@/service/webApi/user/type';
import { setToken } from '@/helper/user-token';
import { omit } from 'lodash-es';
import { useRedirect } from '@/hooks/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
interface CheckInviteCodeProps {}

const CheckInviteCode: FC<CheckInviteCodeProps> = (props) => {
  const authRouteType = useUserStore((state) => state.authRouteType);
  const { redirectToUrl } = useRedirect();
  const [formData, setFormData] = useState<{
    email: string;
    inviteCode: string;
    token: string;
  }>({
    email: '',
    inviteCode: '',
    token: ''
  });
  const { setAuthType, setUserInfo } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      setUserInfo: state.setUserInfo
    }))
  );

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
          setAuthType({
            type: AuthType.SIGN_UP,
            params: {
              codeVerify: true,
              email: formData.email,
              inviteCode: formData.inviteCode
            }
          });
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
        setUserInfo(omit(res, 'token') as Omit<LoginResponse, 'token'>);
        BurialPoint.track('signup-Google三方登录输入邀请码登录成功');
        setToken(res.token);
        redirectToUrl('/dashboard');
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

  const { run: skipInviteCode, loading: skipInviteCodeLoading } = useRequest(
    async () => {
      const res = await webApi.userApi.activateUser(formData.token);
      return res;
    },
    {
      onSuccess(res: any) {
        setUserInfo(omit(res, 'token') as Omit<LoginResponse, 'token'>);
        BurialPoint.track('signup-Google三方登录输入邀请码登录成功');
        setToken(res.token);
        redirectToUrl('/dashboard');
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

        // setFormState({
        //   ...formState,
        //   inviteCode: {
        //     status: 'error',
        //     errorMessage: msg
        //   }
        // });
      },
      manual: true,
      debounceWait: 500
    }
  );

  useEffect(() => {
    if (authRouteType.params) {
      setFormData({
        ...formData,
        email: authRouteType.params.email,
        token: authRouteType.params?.token || ''
      });
    }
  }, []);

  return (
    <div className="flex h-full w-full justify-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-[25px]">
        <h1 className="font-next-book text-[32px] leading-[125%] tracking-[0.64px] text-[#FFF]">
          Got an Invite Code?
        </h1>
        <div className="font-next-book text-[14px] leading-[160%] -tracking-[0.154px] text-[#FFF]">
          HackQuest is currently in beta. Get an invite code from an existing
          user to sign up.
        </div>

        <div className="text-neutral-white">
          <Input
            label="Invite Code"
            type="text"
            name="invite code"
            placeholder="Enter your invite code"
            className="bg-[#212121] text-neutral-white"
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

        <Button
          onClick={() => {
            if (
              authRouteType.params?.registerType === ThirdPartyAuthType.EMAIL
            ) {
              emailVerify();
            } else {
              thirdPartyVerify();
            }
          }}
          block
          type="primary"
          icon={<RightArrowIcon></RightArrowIcon>}
          disabled={emailLoading || thirdPartyLoading}
          loading={emailLoading || thirdPartyLoading}
          iconPosition="right"
          className="
          border-auth-primary-button-border-color
          bg-auth-primary-button-bg
          font-next-book text-[1.125rem]
          text-auth-primary-button-text-color hover:border-auth-primary-button-border-hover-color
          hover:bg-auth-primary-button-hover-bg hover:text-auth-primary-button-text-hover-color
          "
        >
          Next
        </Button>
        {/* <Button
          onClick={() => {
            if (loginRouteParams.params?.registerType === AuthType.EMAIL) {
              dispatch(
                setUnLoginType({
                  type: AuthType.SIGN_UP,
                  params: {
                    codeVerify: true,
                    email: formData.email,
                    inviteCode: ''
                  }
                })
              );
            } else {
              // dispatch(setUserInfo(omit(res, 'token')));

              setToken(formData.token);
              redirectToUrl('/dashboard');
            }
          }}
          block
          type="primary"
          icon={<RightArrowIcon></RightArrowIcon>}
          disabled={emailLoading || thirdPartyLoading}
          loading={emailLoading || thirdPartyLoading}
          iconPosition="right"
          className="
          font-next-book
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
        >
          Skip
        </Button> */}
        <Button
          onClick={() => {
            // redirectToUrl('/');
            // dispatch(setUnLoginType(AuthType.LOGIN));
            if (
              authRouteType.params?.registerType === ThirdPartyAuthType.EMAIL
            ) {
              setAuthType({
                type: AuthType.SIGN_UP,
                params: {
                  codeVerify: true,
                  email: formData.email,
                  inviteCode: ''
                }
              });
            } else {
              skipInviteCode();
            }
          }}
          block
          loading={skipInviteCodeLoading}
          disabled={skipInviteCodeLoading}
          className={cn(
            `hover:text-auth-ghost-button-text-hover-color
          hover:border-auth-ghost-button-border-hover-color
          border
          border-neutral-white
          bg-transparent font-next-book
          text-[1.125rem] text-neutral-white`,
            skipInviteCodeLoading ? 'cursor-not-allowed opacity-70' : ''
          )}
        >
          Skip
        </Button>
        <div className="flex items-center justify-between py-[12px]">
          <div className="h-[1px] w-[20.5%] bg-neutral-white"></div>
          <span className="font-next-book text-[14px] tracking-[0.28px] text-[#FFF]">
            Don’t have an invite code?
          </span>
          <div className="h-[1px] w-[20.5%] bg-neutral-white"></div>
        </div>
        <p className="text-center font-next-book text-[14px] leading-[160%] tracking-[0.28px] text-[#FFF]">
          Follow HackQuest on social media for latest updates:
        </p>
        {/* <ContractUs className="gap-[30px] justify-center"></ContractUs> */}
      </div>
      {/* <WhiteListModal
        open={showWhiteListModal}
        onClose={() => setShowWhiteListModal(false)}
      ></WhiteListModal> */}
    </div>
  );
};

export default CheckInviteCode;
