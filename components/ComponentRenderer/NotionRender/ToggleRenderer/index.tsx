import { FC } from 'react';
import { useGlobalRendererContext } from '../..';
import { NotionComponent } from '../type';
import { CustomComponent, PageType } from '../../type';
import PgcToggleRenderer from './PgcToggleRenderer';
import UgcToggleRenderer from './UgcToggleRenderer';

interface ToggleRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  isRenderChildren?: boolean;
  parent: any;
}

const ToggleRenderer: FC<ToggleRendererProps> = (props) => {
  const { pageType } = useGlobalRendererContext();
  switch (pageType) {
    case PageType.PGC:
      return <PgcToggleRenderer {...props} />;
    case PageType.UGC:
    default:
      return <UgcToggleRenderer {...props} />;
  }
};

export default ToggleRenderer;
