import { FC, ReactNode } from 'react';
import { CustomComponent } from '../../type';
import ComponentRenderer from '..';

interface ExampleRendererProps {
  // children: ReactNode
  component: CustomComponent;
  parent: any;
}

const ExampleRenderer: FC<ExampleRendererProps> = (props) => {
  const { component, parent } = props;
  return (
    <div className="rounded-[.625rem] p-[20px] bg-[#E6E6E6] flex w-full h-full flex-col">
      <div>ExampleRenderer</div>
      {component.children.map((child) => {
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

export default ExampleRenderer;
