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
import type { Documentation } from '@/service/webApi/course/type';
import { LoaderIcon } from 'lucide-react';
import { HelpIcon } from '@/components/Common/Icon/Help';

function DocumentationHeader({
  title,
  isFullscreen,
  onClose,
  toggleFullscreen
}: {
  title?: string;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  onClose: () => void;
}) {
  return (
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
        className={cn('body-s', {
          'body-l absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2': isFullscreen
        })}
      >
        Documentation {title && <span>| {title}</span>}
      </h2>
      <div className="flex items-center gap-3">
        <button className="outline-none wap:hidden" onClick={toggleFullscreen}>
          {isFullscreen ? <ZoomOutIcon /> : <ZoomInIcon className="h-4 w-4" />}
        </button>
        <button id="close" onClick={onClose}>
          <XIcon className={cn('h-4 w-4', { 'h-5 w-5': isFullscreen })} />
        </button>
      </div>
    </div>
  );
}

function DocumentationContent({
  isFullscreen,
  documentation
}: {
  isFullscreen: boolean;
  documentation?: Documentation;
}) {
  const [expanded, setExpanded] = React.useState<{ [id: string]: boolean }>({});

  const parent = React.useMemo(() => {
    return {
      ...documentation,
      isRoot: true
    };
  }, [documentation]);

  function toggleExpand(id: string) {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  }

  return (
    <div className="documentation-scrollbar flex-1">
      <div
        className={cn('flex flex-col gap-5 p-5', {
          'mx-auto w-[808px] px-0': isFullscreen
        })}
      >
        {documentation?.children?.map((item) => (
          <section key={item.id}>
            <h1
              className={cn('inline-flex cursor-pointer items-center gap-2', {
                'body-l-bold': isFullscreen,
                'body-m-bold': !isFullscreen
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
  );
}

export function DocumentationPortal() {
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
    queryKey: ['documentationTree', data.id],
    retry: 3,
    enabled: open && !!data.id,
    staleTime: Infinity,
    queryFn: () => webApi.courseApi.getDocumentationTreeById(data.id as string)
  });

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
              <DocumentationHeader
                title={query.data?.title}
                isFullscreen={isFullscreen}
                toggleFullscreen={toggleFullscreen}
                onClose={handleClose}
              />
              {query.isLoading ? (
                <div className="flex h-full w-full items-center justify-center">
                  <LoaderIcon className="h-5 w-5 animate-spin" />
                </div>
              ) : query.error || !data.id ? (
                <div className="flex h-full w-full flex-col items-center justify-center text-neutral-medium-gray">
                  <HelpIcon className="h-8 w-8" />
                  <p className="body-s mt-3">Documentation not found</p>
                </div>
              ) : (
                <DocumentationContent isFullscreen={isFullscreen} documentation={query.data} />
              )}
            </div>
          </Draggable>,
          document.body
        )}
    </>
  );
}
