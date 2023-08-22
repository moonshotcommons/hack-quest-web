import { FC, ReactNode, useState } from 'react';
import { CustomComponent } from '../../type';
import ComponentRenderer from '..';
import { VscChevronDown } from 'react-icons/vsc';
interface ContentRendererProps {
  component: CustomComponent;
  parent: CustomComponent;
}

const ContentRenderer: FC<ContentRendererProps> = (props) => {
  const { component } = props;
  const [showAll, setShowAll] = useState(true);
  return (
    <div className="px-[20px] py-[15px] rounded-[10px] border border-lesson-title-box-border-color">
      <div
        className="flex  justify-between items-center cursor-pointer"
        onClick={() => setShowAll(!showAll)}
      >
        <span className="font-next-poster-Bold text-[21px]">
          {component.title || component.content}
        </span>
        <span
          className={`${
            showAll ? 'rotate-180' : 'rotate-0'
          } transition-transform duration-150 ease-in-out`}
        >
          <VscChevronDown size={24} />
        </span>
      </div>
      {showAll &&
        component?.children.map((child) => {
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
