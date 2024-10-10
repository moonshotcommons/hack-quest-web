import React, { forwardRef, IframeHTMLAttributes, ReactNode, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';

interface CustomIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  children: ReactNode;
}

// eslint-disable-next-line react/display-name
const CustomIframe = forwardRef<HTMLIFrameElement, CustomIframeProps>(({ children, ...props }, ref) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);

  useImperativeHandle(ref, () => {
    return contentRef as HTMLIFrameElement;
  });
  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <iframe {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
});

export default CustomIframe;
