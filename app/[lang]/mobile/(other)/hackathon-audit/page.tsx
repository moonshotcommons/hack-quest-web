import { pressKitNavData } from '@/app/[lang]/(web)/(base page)/(more)/press-kit/constants/data';
import MenuLink from '@/constants/MenuLink';
import { permanentRedirect } from 'next/navigation';

export default function Page() {
  permanentRedirect(`${MenuLink.PRESS_KIT}/${pressKitNavData[0].id}`);
}
