import MenuLink from '@/constants/MenuLink';
import { permanentRedirect } from 'next/navigation';

export default function Page() {
  permanentRedirect(`${MenuLink.PRESS_KIT}/about`);
}
