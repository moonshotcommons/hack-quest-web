import * as React from 'react';
import { ImageResponse } from 'next/og';

export function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get('name') || 'HackQuest';
  const text = name.slice(0, 1).toUpperCase();

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-black">
        <span tw="text-white text-3xl">{text}</span>
      </div>
    ),
    {
      width: 100,
      height: 100
    }
  );
}
