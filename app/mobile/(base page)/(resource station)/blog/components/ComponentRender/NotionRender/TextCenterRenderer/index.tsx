import React from 'react';
import TextRenderer, { TextRendererProps } from '../TextRenderer';

const TextCenterRenderer: React.FC<TextRendererProps> = (props) => {
  return (
    <p className="text-center">
      <TextRenderer
        {...props}
        fontStyle="text-neutral-rich-gray"
        fontSize="12px"
      />
    </p>
  );
};

export default TextCenterRenderer;
