import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { permanentRedirect } from 'next/navigation';

interface HackathonProp {}

const Hackathon: React.FC<HackathonProp> = () => {
  permanentRedirect(MenuLink.HACKATHON);
};

export default Hackathon;
