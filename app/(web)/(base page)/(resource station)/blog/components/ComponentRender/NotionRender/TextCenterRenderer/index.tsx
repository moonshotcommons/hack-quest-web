import React from 'react';
import TextRenderer, { TextRendererProps } from '../TextRenderer';

const TextCenterRenderer: React.FC<TextRendererProps> = (props) => {
  return (
    <p className="text-center">
      <TextRenderer {...props} fontStyle="text-[#3e3e3e]" />
    </p>
  );
};

export default TextCenterRenderer;
