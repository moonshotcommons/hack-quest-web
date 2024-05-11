'use client';

import * as React from 'react';
import Draggable from 'react-draggable';
import { XIcon } from '@/components/Common/Icon/X';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import { Documentation } from '@/service/webApi/course/type';
import { PageType } from '@/components/ComponentRenderer/type';
import { ComponentRenderer, ComponentRendererProvider } from '@/components/ComponentRenderer';
import { LoaderIcon } from 'lucide-react';
import { HelpIcon } from '@/components/Common/Icon/Help';

interface Position {
  x: number;
  y: number;
}

export function Portal({
  isLoading,
  documentation,
  position,
  isError,
  onClose
}: {
  isLoading: boolean;
  documentation?: Documentation;
  position: Position;
  isError: boolean;
  onClose: () => void;
}) {
  return (
    <Draggable handle="#handle" bounds="body" cancel="#cancel">
      <div
        className="fixed z-[1000] flex h-[325px] w-[394px] flex-col overflow-hidden bg-neutral-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)]"
        style={{
          left: position.x,
          top: position.y
        }}
      >
        <div id="handle" className="flex cursor-move items-center justify-between px-5 pb-2 pt-5">
          <h4 className="text-sm">{documentation?.title}</h4>
          <button id="cancel" onClick={onClose}>
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 px-5 pb-5 text-xs">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <LoaderIcon className="h-4 w-4 animate-spin" />
            </div>
          ) : isError ? (
            <div className="flex h-full w-full flex-col items-center justify-center text-neutral-medium-gray">
              <HelpIcon className="h-6 w-6" />
              <p className="body-s mt-3">Documentation not found</p>
            </div>
          ) : (
            <ComponentRendererProvider type={PageType.DOCUMENTATION} CustomComponentRenderer={() => null}>
              {documentation?.content?.map((child: any, index: number) => (
                <ComponentRenderer
                  key={child.id}
                  component={child}
                  parent={{ ...documentation, isRoot: true }}
                  position={index}
                  prevComponent={null}
                  nextComponent={null}
                />
              ))}
            </ComponentRendererProvider>
          )}
        </div>
      </div>
    </Draggable>
  );
}

function calclatePosition(textRect: DOMRect) {
  const portalWith = 394;
  const portalHeight = 325;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const offset = 10;
  let x = 0;
  let y = 0;

  if (textRect.left < portalWith) {
    x = textRect.left;
  }
  if (textRect.left > portalWith || viewportWidth - textRect.left < portalWith) {
    x = textRect.left - portalWith + textRect.width;
  }
  if (textRect.left < portalWith && viewportWidth - textRect.left < portalWith) {
    x = viewportWidth / 2 - portalWith / 2;
  }
  if (textRect.top < portalHeight) {
    y = textRect.top + offset + textRect.height;
  }
  if (textRect.top > portalHeight || viewportHeight - textRect.top < portalHeight) {
    y = textRect.top - portalHeight - offset;
  }
  if (textRect.top < portalHeight && viewportHeight - textRect.top < portalHeight) {
    y = viewportHeight / 2 - portalHeight / 2;
  }

  return { x, y };
}

export function DocumentationHighlight({ linkId, text }: { linkId: string; text?: string | React.ReactNode }) {
  const [posiiton, setPosition] = React.useState<Position>({ x: 0, y: 0 });
  const [visible, setVisible] = React.useState(false);

  const handleTextClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const rect = (event.target as HTMLSpanElement).getBoundingClientRect();
    const { x, y } = calclatePosition(rect);
    setPosition({ x, y });
    setVisible(true);
  };

  function handleClose() {
    setVisible(false);
  }

  const query = useQuery({
    queryKey: ['documentationDetail', linkId],
    enabled: visible && !!linkId,
    staleTime: Infinity,
    queryFn: () => webApi.courseApi.getDocumentationById(linkId)
  });

  return (
    <>
      <span
        className="cursor-pointer bg-yellow-light px-1 text-sm font-bold text-neutral-black"
        onClick={handleTextClick}
      >
        {text}
      </span>
      {visible && (
        <Portal
          isError={query.isError}
          isLoading={query.isLoading}
          documentation={query.data}
          position={posiiton}
          onClose={handleClose}
        />
      )}
    </>
  );
}
