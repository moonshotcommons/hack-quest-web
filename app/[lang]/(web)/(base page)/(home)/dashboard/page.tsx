import { Metadata } from 'next';
import { Lang } from '@/i18n/config';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import Button from '@/components/Common/Button';
import { EcosystemCard } from './components/ecosystem-card';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'Dashboard',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/dashboard`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/dashboard`,
        en: `https://www.hackquest.io/${Lang.EN}/dashboard`,
        zh: `https://www.hackquest.io/${Lang.ZH}/dashboard`
      }
    }
  };
}

const ecosystems = [
  { id: 1, name: 'solana', description: 'Solana is the fastest Layer1 blockchain using Proof of History' },
  { id: 2, name: 'ethereum', description: 'Ethereum is the fastest Layer1 blockchain using Proof of History' },
  { id: 3, name: 'mantle', description: 'Mantle is the fastest Layer1 blockchain using Proof of History' },
  { id: 4, name: 'arbitrum', description: 'Arbitrum is the fastest Layer1 blockchain using Proof of History' }
];

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h2 className="text-lg font-bold text-neutral-off-black">You’re not enrolled in any learning track</h2>
          <Button size="small" ghost className="text-xs uppercase">
            Explore ecosystems
          </Button>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="font-next-book-bold text-lg font-bold text-neutral-black">Explore Certified Learning Track</h2>
          <div className="grid grid-cols-2 gap-4">
            {ecosystems.map((ecosystem) => (
              <EcosystemCard
                key={ecosystem.id}
                name={ecosystem.name}
                description={ecosystem.description}
                href={`/hackathon/explore/${ecosystem.name}`}
                tags={['Rust', 'Certified Learning Track', '15 Projects']}
              />
            ))}
          </div>
        </div>
      </div>
      <PageRetentionTime trackName="dashboard-页面留存时间"></PageRetentionTime>
    </>
  );
}
