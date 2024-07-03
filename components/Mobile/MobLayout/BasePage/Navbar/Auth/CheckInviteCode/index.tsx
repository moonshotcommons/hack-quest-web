import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import message from 'antd/es/message';
import { FC, useContext, useEffect, useState } from 'react';
import { LoginResponse, ThirdPartyAuthType } from '@/service/webApi/user/type';
import { setToken } from '@/helper/user-token';
import { omit } from 'lodash-es';
import { useRedirect } from '@/hooks/router/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { AuthContext } from '..';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useRouter } from 'next/navigation';

interface CheckInviteCodeProps {}

const CheckInviteCode: FC<CheckInviteCodeProps> = (props) => {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.AUTH);
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
  const { setAuthType, setUserInfo } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      setUserInfo: state.setUserInfo
    }))
  );

  const router = useRouter();

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
              errorMessage: t('invalid_invite_code')
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
        changeNavState();
        setUserInfo(omit(res, 'token') as Omit<LoginResponse, 'token'>);
        BurialPoint.track('signup-Google三方登录输入邀请码登录成功');
        setToken(res.token);
        redirectToUrl('/dashboard');
        router.refresh();
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
        router.refresh();
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
          errorMessage: t('invite_code_required')
        }
      });
      return false;
    }

    if (formData.inviteCode.length > 40) {
      setFormState({
        ...formState,
        inviteCode: {
          status: 'error',
          errorMessage: t('invite_code_too_long')
        }
      });
      return false;
    }

    if (!/^[\w%&!#-_?@]+$/g.test(formData.inviteCode)) {
      setFormState({
        ...formState,
        inviteCode: {
          status: 'error',
          errorMessage: t('invite_code_invalid')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex w-full flex-col gap-8">
        <p className="body-m-bold text-neutral-rich-gray">{t('have_an_invite_code')}</p>
        <Input
          label={`${t('invite_code')} (${t('optional')})`}
          type="text"
          name="invite code"
          isMobile
          placeholder={t('enter_invite_code')}
          state={formState.inviteCode.status as any}
          errorMessage={formState.inviteCode.errorMessage}
          delay={500}
          theme={'light'}
          value={formData.inviteCode}
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
          button-text-m py-4 uppercase
          "
        >
          {t('continue')}
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
          className="button-text-m border-neutral-off-black py-4 uppercase"
        >
          {t('skip')}
        </Button>
      </div>
    </div>
  );
};

export default CheckInviteCode;
