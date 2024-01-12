import { AuthType } from '@/store/zustand/userStore';

export const unLoginTab = [
  {
    label: 'Log in',
    value: AuthType.LOGIN
  },
  {
    label: 'Sign Up',
    value: AuthType.SIGN_UP
  }
];
