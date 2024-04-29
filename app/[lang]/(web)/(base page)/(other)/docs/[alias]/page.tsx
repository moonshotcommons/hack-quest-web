import { ComponentRenderer, ComponentRendererProvider } from '@/components/ComponentRenderer';
import webApi from '@/service';
import { FC } from 'react';
import DocsCustomRenderer from './components/DocsCustormRenderer';
import { CustomComponent, PageType } from '@/components/ComponentRenderer/type';
import Link from 'next/link';
import DiscordIcon from '@/components/Common/Icon/Discord';
import TelegramIcon from '@/components/Common/Icon/Telegram';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import { HACKQUEST_DISCORD, HACKQUEST_TELEGRAM, HACKQUEST_TWITTER } from '@/constants/links';
import { useTranslation } from '@/i18n/server';
import { Lang, TransNs } from '@/i18n/config';

interface DocsProps {
  params: {
    alias: string;
    lang: Lang;
  };
}

const Docs: FC<DocsProps> = async ({ params: { alias, lang } }) => {
  const docs = await webApi.helperApi.fetchGetDocs();
  const doc = await webApi.helperApi.fetchGetDocsById(alias);
  const parentGroup = docs.find((d) => d.children.find((child) => child.id === doc.parentId));

  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full justify-center pt-10">
      <div className="w-[808px]">
        <p className="body-m-bold text-neutral-black">{parentGroup?.title}</p>
        <h2 className="text-h2 mb-10 mt-2 text-neutral-black">{doc.title}</h2>
        <div className="flex flex-col">
          <ComponentRendererProvider type={PageType.BLOG} CustomComponentRenderer={DocsCustomRenderer}>
            {doc?.content?.map((component: CustomComponent, index: number) => {
              const prevComponent = index === 0 ? null : doc.content[index - 1];
              const nextComponent = index === doc.content.length - 1 ? null : doc.content[index + 1];
              return (
                <ComponentRenderer
                  key={component.id}
                  component={component}
                  parent={doc}
                  position={index}
                  prevComponent={prevComponent}
                  nextComponent={nextComponent}
                />
              );
            })}
          </ComponentRendererProvider>
        </div>
        <div className="mt-20 h-[1px] w-full bg-neutral-light-gray"></div>
        <div className="body-m mx-auto mb-[68px] mt-5 flex w-full justify-between text-neutral-medium-gray">
          <span>{t('stayConnected')}</span>
          <div className="flex items-center gap-[16px]">
            <Link href={HACKQUEST_DISCORD} target="_blank" className="cursor-pointer hover:scale-[1.1]">
              <span className="text-text-default-color">
                <DiscordIcon color={'#8c8c8c'} isMobile={true} />
              </span>
            </Link>
            <Link href={HACKQUEST_TWITTER} target="_blank" className="cursor-pointer hover:scale-[1.1]">
              <span className="text-text-default-color">
                <TwitterIcon color={'#8c8c8c'} isMobile={true} />
              </span>
            </Link>
            <Link href={HACKQUEST_TELEGRAM} target="_blank" className="cursor-pointer hover:scale-[1.1]">
              <span className="text-text-default-color">
                <TelegramIcon color={'#8c8c8c'} isMobile={true} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
