import MenuLink from '@/constants/MenuLink';
import { permanentRedirect } from 'next/navigation';

interface HackathonProp {}

const Hackathon: React.FC<HackathonProp> = () => {
  permanentRedirect(MenuLink.HACKATHON);
};

export default Hackathon;
