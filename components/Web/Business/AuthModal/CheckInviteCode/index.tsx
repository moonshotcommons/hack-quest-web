import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Input from '@/components/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
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
  const { setAuthType, setUserInfo, setAuthModalOpen } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      setUserInfo: state.setUserInfo,
      setAuthModalOpen: state.setAuthModalOpen
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
        setAuthModalOpen(false);
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
        setAuthModalOpen(false);
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

    if (!/[\w%&*!#-]/.test(formData.inviteCode)) {
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
      <div className="flex w-full flex-col gap-[24px]">
        <p className="body-l-bold text-neutral-rich-gray">
          Got an Invite Code?
        </p>
        {/* <div className="body-s text-neutral-black">
          HackQuest is currently in beta. Get an invite code from an existing
          user to sign up.
        </div> */}

        <Input
          label="Invite Code"
          type="text"
          name="invite code"
          placeholder="Enter your invite code"
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

        <Button
          onClick={() => {
            if (!verifyInviteCode()) return;

            if (
              authRouteType.params?.registerType === ThirdPartyAuthType.EMAIL
            ) {
              setAuthType({
                type: AuthType.SIGN_UP,
                params: {
                  codeVerify: true,
                  email: formData.email,
                  inviteCode: formData.inviteCode
                }
              });
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
          button-text-l border-auth-primary-button-border-color bg-auth-primary-button-bg
          py-4
          uppercase
          text-auth-primary-button-text-color
          hover:border-auth-primary-button-border-hover-color
          hover:bg-auth-primary-button-hover-bg
          hover:text-auth-primary-button-text-hover-color
          "
        >
          Next
        </Button>
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
          ghost
          className="button-text-l border-neutral-off-black py-4 uppercase"
        >
          Skip
        </Button>
        <div className="flex items-center justify-between py-[12px]">
          <div className="h-[1px] w-[20.5%] bg-neutral-black"></div>
          <span className="body-s text-neutral-black">
            Don’t have an invite code?
          </span>
          <div className="h-[1px] w-[20.5%] bg-neutral-black"></div>
        </div>
        <p className="body-s text-center text-neutral-black">
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
