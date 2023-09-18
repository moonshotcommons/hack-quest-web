import { FC, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import ComponentRenderer from '..';
import { CustomComponent } from '../../type';
interface ExampleRendererProps {
  // children: ReactNode
  component: CustomComponent;
  parent: any;
}

const ExampleRenderer: FC<ExampleRendererProps> = (props) => {
  const { component, parent } = props;
  const [expand, setExpand] = useState(true);
  return (
    <div
      className={`rounded-[.625rem] py-[12px] px-[20px] bg-[#E6E6E6] flex w-full flex-col h-fit ${
        expand ? 'min-h-fit flex-1' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="inline-flex font-next-poster-Bold items-center relative text-[18px] font-bold tracking-[1.08px]">
          {component.title || 'Example'}
        </span>
        <span onClick={() => setExpand(!expand)}>
          <FiChevronDown
            size={28}
            color=""
            className={`${
              expand ? 'rotate-180' : '0'
            } transition-transform cursor-pointer`}
          ></FiChevronDown>
        </span>
      </div>
      {expand && (
        <div className="relative  mt-[20px]">
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
      )}
    </div>
  );
};

export default ExampleRenderer;
