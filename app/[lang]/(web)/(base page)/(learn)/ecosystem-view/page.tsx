import { Metadata } from 'next';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import webApi from '@/service';
import EcoCard from '../ecosystem-explore/components/CertifiedLearningTrack/EcoCard';
import { LoginResponse, UserRole } from '@/service/webApi/user/type';

interface SearchParamsType {
  params: {
    lang: Lang;
  };
}

export async function generateMetadata({ params }: SearchParamsType): Promise<Metadata> {
  const { lang } = params;

  const metadata: Metadata = {
    title: 'HackQuest Ecosystem View',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.ECOSYSTEM_VIEW}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.ECOSYSTEM_VIEW}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.ECOSYSTEM_VIEW}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.ECOSYSTEM_VIEW}`
      }
    }
  };

  return metadata;
}

const ExplorePage: React.FC<SearchParamsType> = async ({ params }) => {
  const { lang } = params;
  let userInfo: Partial<LoginResponse> | null = null;
  try {
    userInfo = await webApi.userApi.getUserInfo();
  } catch (err: any) {
    if (err.code === 401) {
      return <div className="body-xl-bold py-10 text-center">没有登录，请登录访问</div>;
    }
    return <div className="body-xl-bold py-10 text-center">{err.msg || err.message}</div>;
  }

  if (![UserRole.ADMIN].includes(userInfo.role!)) {
    return <p className="body-xl-bold py-10 text-center">没有权限访问</p>;
  }
  const ecosystems = await webApi.ecosystemApi.getEcosystems({
    lang
  });
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-wrap gap-[32px]">
        {ecosystems.map((eco) => (
          <div key={eco.id} className="w-[calc((100%-64px)/3)]">
            <EcoCard ecosystem={eco} isView={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
