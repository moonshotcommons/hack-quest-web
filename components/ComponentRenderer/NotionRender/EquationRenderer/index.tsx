import { FC } from 'react';
import MathJax from 'react-mathjax';
import { NotionComponent } from '../type';
import { CustomComponent } from '../../type';
interface EquationRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  parent: any;
}

const EquationRenderer: FC<EquationRendererProps> = (props) => {
  const { component } = props;
  return (
    <MathJax.Provider datatype={component.type}>
      <span className="[&>div]:inline-block">
        <MathJax.Node formula={component.content.expression} />
      </span>
    </MathJax.Provider>
  );
};

export default EquationRenderer;
