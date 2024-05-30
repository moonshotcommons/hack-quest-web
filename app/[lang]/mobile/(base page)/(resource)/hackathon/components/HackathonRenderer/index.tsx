import React from 'react';

import { ComponentRendererProvider, ComponentRenderer } from '@/components/ComponentRenderer';
import { CustomComponent, PageType } from '@/components/ComponentRenderer/type';
import HackathonCustomRenderer from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/components/HackathonCustomRenderer';

interface HackathonRendererProp {
  content: CustomComponent[];
}

const HackathonRenderer: React.FC<HackathonRendererProp> = ({ content }) => {
  return (
    <div className="w-full">
      <ComponentRendererProvider
        type={PageType.BLOG}
        CustomComponentRenderer={HackathonCustomRenderer}
        isMobile
        textRenderer={{
          fontSize: '14px'
        }}
      >
        {content?.map((component: CustomComponent, index: number) => {
          const prevComponent = index === 0 ? null : content[index - 1];
          const nextComponent = index === content.length - 1 ? null : content[index + 1];
          return (
            <ComponentRenderer
              key={component.id}
              component={component}
              parent={{}}
              position={index}
              prevComponent={prevComponent}
              nextComponent={nextComponent}
            />
          );
        })}
      </ComponentRendererProvider>
    </div>
  );
};

export default HackathonRenderer;
