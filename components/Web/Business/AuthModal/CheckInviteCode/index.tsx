import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import message from 'antd/es/message';
import { FC, useEffect, useState } from 'react';

// import ContractUs from '@/app/[lang]/(web)/(base page)/(landing)/components/ContractUs';
import { LoginResponse, ThirdPartyAuthType } from '@/service/webApi/user/type';
import { setToken } from '@/helper/user-token';
import { omit } from 'lodash-es';
import { useRedirect } from '@/hooks/router/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
interface CheckInviteCodeProps {}

const CheckInviteCode: FC<CheckInviteCodeProps> = (props) => {
  const authRouteType = useUserStore((state) => state.authRouteType);
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const { redirectToUrl } = useRedirect();
  const [formData, setFormData] = useState<{
    email: string;
    inviteCode: string;
    token: string;
  }>({
    email: '',
    inviteCode: query.get('inviteCode') || '',
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
      const res = await webApi.userApi.checkInviteCodeByThirdParty(formData.inviteCode, formData.token);
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
    <div className="flex h-full w-full flex-col justify-between ">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-8">
        <p className="body-l-bold text-neutral-off-black">Do you have an invite code?</p>
        {/* <div className="body-s text-neutral-black">
          HackQuest is currently in beta. Get an invite code from an existing
          user to sign up.
        </div> */}

        <Input
          label="Invite Code (Optional)"
          type="text"
          name="invite code"
          labelClassName=""
          placeholder="Enter your invite code"
          state={formState.inviteCode.status as any}
          errorMessage={formState.inviteCode.errorMessage}
          delay={500}
          clear
          value={formData.inviteCode}
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

        {/* <ContractUs className="gap-[30px] justify-center"></ContractUs> */}
      </div>
      <div className="flex w-full flex-col gap-4">
        <Button
          onClick={() => {
            if (!verifyInviteCode()) return;

            if (authRouteType.params?.registerType === ThirdPartyAuthType.EMAIL) {
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
          disabled={emailLoading || thirdPartyLoading}
          loading={emailLoading || thirdPartyLoading}
          className="
          button-text-l py-4 uppercase
          "
        >
          submit
        </Button>
        <Button
          onClick={() => {
            // redirectToUrl('/');
            // dispatch(setUnLoginType(AuthType.LOGIN));
            if (authRouteType.params?.registerType === ThirdPartyAuthType.EMAIL) {
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
      </div>
      {/* <WhiteListModal
        open={showWhiteListModal}
        onClose={() => setShowWhiteListModal(false)}
      ></WhiteListModal> */}
    </div>
  );
};

export default CheckInviteCode;
