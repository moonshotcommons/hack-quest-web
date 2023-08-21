import { FC, ReactNode } from 'react';
import { CustomComponent } from '../../type';
import ComponentRenderer from '..';

interface ContentRendererProps {
  component: CustomComponent;
  parent: CustomComponent;
}

const ContentRenderer: FC<ContentRendererProps> = (props) => {
  const { component } = props;
  return (
    <div>
      {component?.children.map((child) => {
        return (
          <ComponentRenderer
            key={child.id}
            component={child}
            parent={component}
          ></ComponentRenderer>
        );
      })}
    </div>
  );
};

export default ContentRenderer;
