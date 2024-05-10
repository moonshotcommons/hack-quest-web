'use client';

import * as React from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { XIcon } from '@/components/Common/Icon/X';

interface Position {
  x: number;
  y: number;
}

export function Portal({
  position,
  onPositionChange,
  onClose
}: {
  position: Position;
  onPositionChange: (position: Position) => void;
  onClose: () => void;
}) {
  function handleDrag(_: DraggableEvent, data: DraggableData) {
    onPositionChange({ x: data.x, y: data.y });
  }

  return (
    <Draggable handle="#handle" bounds="body" cancel="#cancel">
      <div
        className="fixed z-[1000] h-[325px] w-[394px] overflow-hidden bg-neutral-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)]"
        style={{
          left: position.x,
          top: position.y
        }}
      >
        <div id="handle" className="flex cursor-move items-center justify-between px-5 pb-2 pt-5">
          <h4 className="text-sm">DApps</h4>
          <button id="cancel" onClick={onClose}>
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 pb-5 text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rhoncus, ante id varius feugiat.
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

export function HighlightedText({ text }: { text?: string | React.ReactNode }) {
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

  return (
    <>
      <span
        className="cursor-pointer bg-yellow-light px-1 text-sm font-bold text-neutral-black"
        onClick={handleTextClick}
      >
        {text || 'DApps'}
      </span>
      {visible && <Portal position={posiiton} onPositionChange={setPosition} onClose={handleClose} />}
    </>
  );
}
