import MenuLink from '@/constants/MenuLink';
import { permanentRedirect } from 'next/navigation';

const Hackathon = () => {
  permanentRedirect(MenuLink.EXPLORE_HACKATHON);
};
export default Hackathon;
