import { FC } from 'react';
import MathJax from 'react-mathjax';
import { NotionComponent } from '../type';
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
