import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Checkbox from '@/components/v2/Common/Checkbox';
import Input from '@/components/v2/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useValidator } from '@/hooks/useValidator';
import webApi from '@/service';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useDebounceFn } from 'ahooks';
import { message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import WhiteListModal from '../WhiteListModal';
import { useGetUserUnLoginType } from '@/hooks/useGetUserInfo';
import ContractUs from '../../Landing/ContractUs';
import DarkInstagramIcon from '@/components/Common/Icon/DarkInstagram';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import DiscordIcon from '@/components/Common/Icon/Discord';

interface CheckInviteCodeProps {}

const CheckInviteCode: FC<CheckInviteCodeProps> = (props) => {
  const loginRouteParams = useGetUserUnLoginType();

  const [formData, setFormData] = useState<{
    email: string;
    inviteCode: string;
  }>({
    email: '',
    inviteCode: ''
  });

  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    // email: {
    //   status: 'default',
    //   errorMessage: ''
    // },
    inviteCode: {
      status: 'default',
      errorMessage: ''
    }
  });

  const { run: validateInviteCode } = useDebounceFn(
    () => {
      BurialPoint.track('signup-验证邀请码按钮点击');

      // validator.validate(formData, async (errors, fields) => {
      //   if (!errors) {
      //     const status: any = { ...formState };
      //     for (let key in status) {
      //       status[key] = { status: 'success', errorMessage: '' };
      //     }
      //     try {
      //       BurialPoint.track('signup-发送注册邮件');
      //       const res = await webApi.userApi.userRegister(formData);
      //       BurialPoint.track('signup-注册邮件发送成功');
      //       dispatch(setUnLoginType(UnLoginType.EMAIL_VERIFY));
      //     } catch (e: any) {
      //       BurialPoint.track('signup-注册邮件发送失败', { message: e?.msg });
      //       console.log(e);
      //       if (e?.code === 400) setShowWhiteListModal(true);
      //       else message.error(e?.msg);
      //     }
      //   } else {
      //     const status: any = { ...formState };
      //     errors.map((error) => {
      //       status[error.field as string] = {
      //         status: 'error',
      //         errorMessage: error.message
      //       };
      //     });
      //     setFormState(status);
      //   }
      // });
    },
    { wait: 500 }
  );

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
            name="inviteCode"
            placeholder="8+characters with a mix of letters & numbers"
            className="bg-[#212121] text-white"
            // description="Use 8 or more characters with a mix of letters & numbers"
            state={formState.inviteCode.status as any}
            errorMessage={formState.inviteCode.errorMessage}
            delay={500}
            rules={{
              type: 'string',
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
              message: '8 or more characters with a mix of letters & numbers'
            }}
            onChange={(e) => {
              setFormData({
                ...formData,
                inviteCode: e.target.value
              });
            }}
          ></Input>
        </div>

        <Button
          onClick={() => {}}
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
          onClick={() => {}}
          block
          className="
            font-next-book
            text-[1.125rem]
            border
            bg-transparent
            text-white hover:text-auth-ghost-button-text-hover-color
            border-white hover:border-auth-ghost-button-border-hover-color
          "
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
