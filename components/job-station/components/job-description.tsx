'use client';

import { createEditor } from '@wangeditor/editor';

export function JobDescription({ description }: { description: Record<string, any> | string }) {
  const html =
    typeof description === 'string' ? description : createEditor({ content: description?.content || [] }).getHtml();
  return (
    <div
      className="body-m reset-editor-style text-neutral-off-black [&_h3]:my-4 [&_ol]:list-inside [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-inside [&_ul]:list-disc"
      dangerouslySetInnerHTML={{
        __html: html
      }}
    />
  );
}
