import React from 'react';
import PreviewNav from '../PreviewNav';
import PreviewEvents from '../PreviewEvents';
import PreviewRender from '../PreviewRender';

function Preview() {
  return (
    <div className="flex flex-col h-full">
      <PreviewNav />
      <PreviewEvents />
      <PreviewRender />
    </div>
  );
}

export default Preview;
