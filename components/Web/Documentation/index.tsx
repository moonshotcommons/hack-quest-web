'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useDocumentation } from '@/store/zustand/documentationStore';
import { ZoomInIcon } from '@/components/Common/Icon/ZoomIn';
import { ZoomOutIcon } from '@/components/Common/Icon/ZoomOut';
import { XIcon } from '@/components/Common/Icon/X';
import { cn } from '@/helper/utils';

export function Documentation() {
  const { open, data, onClose } = useDocumentation();
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const lastPositionRef = React.useRef({ x: 0, y: 0 });
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0
  });

  function toggleFullscreen() {
    if (isFullscreen) {
      setPosition(lastPositionRef.current);
    } else {
      setPosition({ x: 0, y: 0 });
    }
    setIsFullscreen(!isFullscreen);
  }

  function handleDrag(_: DraggableEvent, data: DraggableData) {
    setPosition({ x: data.x, y: data.y });
    lastPositionRef.current = { x: data.x, y: data.y };
  }

  function handleClose() {
    onClose();
    setIsFullscreen(false);
    setPosition({ x: 0, y: 0 });
  }

  React.useEffect(() => {
    if (open) {
      console.log(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      {open &&
        createPortal(
          <Draggable
            handle="#handle"
            cancel="#close"
            position={position}
            bounds="body"
            disabled={isFullscreen}
            onDrag={handleDrag}
          >
            <div
              className={cn(
                'fixed z-[1000] flex h-full max-h-[640px] w-[394px] flex-col bg-neutral-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)]',
                {
                  'inset-0 h-screen max-h-full w-screen': isFullscreen,
                  'right-8 top-28': data.placement === 'bottom-right' && !isFullscreen,
                  'left-0 top-0 h-screen max-h-full w-full sm:left-[40%] sm:top-[20%]':
                    data.placement === 'center' && !isFullscreen
                }
              )}
            >
              <div
                id="handle"
                className={cn(
                  'relative flex cursor-move items-center justify-between border-b border-b-neutral-medium-gray p-5 text-neutral-black',
                  {
                    'justify-end px-10': isFullscreen
                  }
                )}
              >
                <h2
                  className={cn('text-sm', {
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg': isFullscreen
                  })}
                >
                  Documentation | Solidity 101
                </h2>
                <div className="flex items-center gap-3">
                  <button className="hidden outline-none sm:block" onClick={toggleFullscreen}>
                    {isFullscreen ? <ZoomOutIcon /> : <ZoomInIcon className="h-4 w-4" />}
                  </button>
                  <button id="close" onClick={handleClose}>
                    <XIcon className={cn('h-4 w-4', { 'h-5 w-5': isFullscreen })} />
                  </button>
                </div>
              </div>
              <div
                className={cn('documentation-scrollbar h-full flex-1 scroll-m-1 overflow-y-auto p-5', {
                  'mx-auto max-w-[808px] px-0': isFullscreen
                })}
              >
                hello world
              </div>
            </div>
          </Draggable>,
          document.body
        )}
    </>
  );
}
