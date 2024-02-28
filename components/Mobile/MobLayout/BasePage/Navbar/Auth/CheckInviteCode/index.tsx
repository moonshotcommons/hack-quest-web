import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { FC, useContext, useEffect, useState } from 'react';

// import ContractUs from '@/app/(web)/(base page)/(landing)/components/ContractUs';
import { LoginResponse, ThirdPartyAuthType } from '@/service/webApi/user/type';
import { setToken } from '@/helper/user-token';
import { omit } from 'lodash-es';
import { useRedirect } from '@/hooks/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { AuthContext } from '..';
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

  const { changeNavState } = useContext(AuthContext);

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
        changeNavState();
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
        changeNavState();
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
    <div className="flex h-full w-full flex-col justify-between px-5">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-8">
        <p className="text-center font-GT-Walsheim-Trial text-[1rem] leading-[140%] text-[#C4C4C4]">
          Do you have an invite code?
        </p>
        {/* <div className="body-s text-neutral-black">
          HackQuest is currently in beta. Get an invite code from an existing
          user to sign up.
        </div> */}

        <Input
          // label="Invite Code (Optional)"
          type="text"
          name="invite code"
          isMobile
          source="mantle"
          placeholder="Enter your invite code"
          state={formState.inviteCode.status as any}
          errorMessage={formState.inviteCode.errorMessage}
          delay={500}
          theme={'dark'}
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

        {/* <ContractUs className="gap-[30px] justify-center"></ContractUs> */}
      </div>
      <div className="flex w-full flex-col gap-4">
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
          type="mantle"
          disabled={emailLoading || thirdPartyLoading}
          loading={emailLoading || thirdPartyLoading}
          className="gap-[15px] rounded-[10px] font-GT-Walsheim-Trial text-[18px] leading-[140%]"
        >
          Submit
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
          className="
          gap-[15px] rounded-[10px] border-white font-GT-Walsheim-Trial text-[18px] leading-[140%] text-white
          "
        >
          Skip
        </Button>
      </div>
      {/* <WhiteListModal
        open={showWhiteListModal}
        onClose={() => setShowWhiteListModal(false)}
      ></WhiteListModal> */}
    </div>
  );
};

export default CheckInviteCode;
