'use client';

import { createEditor } from '@wangeditor/editor';

export function JobDescription({ description }: { description: Record<string, any> | string }) {
  const html =
    typeof description === 'string' ? description : createEditor({ content: description?.content || [] }).getHtml();
  return (
    <p
      className="body-m reset-editor-style text-neutral-off-black [&_h3]:my-4 [&_p]:mb-2"
      dangerouslySetInnerHTML={{
        __html: html
      }}
    />
  );
}
