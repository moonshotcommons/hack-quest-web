import { FC, ReactNode } from 'react';
import { NotionComponent } from '../../LessonPage/type';
import MathJax from 'react-mathjax';
interface EquationRendererProps {
  component: NotionComponent;
  parent: any;
}

const EquationRenderer: FC<EquationRendererProps> = (props) => {
  const { component } = props;
  return (
    <MathJax.Provider>
      <span className="[&>div]:inline-block">
        <MathJax.Node formula={component.content.expression} />
      </span>
    </MathJax.Provider>
  );
};

export default EquationRenderer;
