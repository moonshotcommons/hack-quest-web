'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useDocumentation } from '@/store/zustand/documentationStore';
import { ZoomInIcon } from '@/components/Common/Icon/ZoomIn';
import { ZoomOutIcon } from '@/components/Common/Icon/ZoomOut';
import { XIcon } from '@/components/Common/Icon/X';
import { cn } from '@/helper/utils';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import { IconChevron } from '@/components/Common/Icon/Chevron';
import { ComponentRenderer, ComponentRendererProvider } from '@/components/ComponentRenderer';
import { PageType } from '@/components/ComponentRenderer/type';

export function Documentation() {
  const { open, data, onClose } = useDocumentation();
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const lastPositionRef = React.useRef({ x: 0, y: 0 });
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

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

  const query = useQuery({
    queryKey: ['documentation', data.id],
    enabled: open && !!data.id,
    staleTime: Infinity,
    queryFn: () => webApi.courseApi.getDocumentationTreeById(data.id as string)
  });

  const parent = React.useMemo(() => {
    return {
      ...query.data,
      isRoot: true
    };
  }, [query.data]);

  const [expanded, setExpanded] = React.useState<{ [id: string]: boolean }>({});

  function toggleExpand(id: string) {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  }

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
                  'left-[40%] top-[20%] wap:left-0 wap:top-0 wap:h-screen wap:max-h-full wap:w-full':
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
                  Documentation | {query?.data?.title}
                </h2>
                <div className="flex items-center gap-3">
                  <button className="outline-none wap:hidden" onClick={toggleFullscreen}>
                    {isFullscreen ? <ZoomOutIcon /> : <ZoomInIcon className="h-4 w-4" />}
                  </button>
                  <button id="close" onClick={handleClose}>
                    <XIcon className={cn('h-4 w-4', { 'h-5 w-5': isFullscreen })} />
                  </button>
                </div>
              </div>
              <div className="documentation-scrollbar flex-1">
                <div
                  className={cn('flex flex-col gap-5 p-5', {
                    'mx-auto w-[808px] px-0': isFullscreen
                  })}
                >
                  {query.data?.children?.map((item) => (
                    <section key={item.id}>
                      <h1
                        className={cn('inline-flex cursor-pointer items-center gap-2 text-base font-bold', {
                          'text-lg': isFullscreen
                        })}
                        onClick={() => toggleExpand(item.id)}
                      >
                        <IconChevron direction={expanded[item.id] ? 'down' : 'right'} />
                        <span>{item.title}</span>
                      </h1>
                      {expanded[item.id] && (
                        <div className="ml-6 mt-2">
                          <ComponentRendererProvider
                            type={isFullscreen ? PageType.DOCUMENTATION_FULL : PageType.DOCUMENTATION}
                            CustomComponentRenderer={() => null}
                          >
                            {item.content?.map((child: any, index: number) => (
                              <ComponentRenderer
                                key={child.id}
                                component={child}
                                parent={parent}
                                position={index}
                                prevComponent={null}
                                nextComponent={null}
                              />
                            ))}
                          </ComponentRendererProvider>
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </Draggable>,
          document.body
        )}
    </>
  );
}
