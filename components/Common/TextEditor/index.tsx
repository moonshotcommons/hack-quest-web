'use client';

import React, { useState, useEffect, FC } from 'react';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig, i18nChangeLanguage } from '@wangeditor/editor';

import { useLang } from '@/components/Provider/Lang';
import { Lang } from '@/i18n/config';
import webApi from '@/service';
import { cn } from '@/helper/utils';

const placeholder = {
  [Lang.EN]: 'Please enter content...',
  [Lang.ZH]: '请输入内容...'
};

interface TextEditorProps {
  onChange?: (editor: IDomEditor) => void;
  onCreated?: (editor: IDomEditor) => void;
  defaultContent?: any[];
  imageUploadPath?: string;
  simpleModel?: boolean;
  className?: string;
  defaultHtml?: string;
  value?: string;
  readOnly?: boolean;
}

export const TEXT_EDITOR_TYPE = 'text-editor';

export function transformTextToEditorValue(value: any) {
  if (value?.type !== TEXT_EDITOR_TYPE && typeof value === 'string') {
    const paragraph = {
      type: 'paragraph',
      children: [{ text: value?.replaceAll('\\n', '\n') || '' }]
    };

    return [paragraph];
  }

  return value?.content || [];
}

const TextEditor: FC<TextEditorProps> = ({
  onChange = () => {},
  onCreated,
  defaultContent = [],
  imageUploadPath = 'text-editor/images',
  simpleModel = false,
  className,
  defaultHtml,
  value,
  readOnly = false
}) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const { lang } = useLang();
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: simpleModel ? ['blockquote', 'insertVideo', 'group-image', 'insertTable', 'codeBlock', 'todo'] : []
  };
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: placeholder[lang],
    readOnly,

    MENU_CONF: {
      uploadImage: {
        async customUpload(file: File, insertFn: Function) {
          const fData = new FormData();
          fData.append('file', file);
          fData.append('filepath', imageUploadPath);
          fData.append('isPublic', `${true}`);

          const { filepath } = await webApi.commonApi.uploadImage(fData);
          insertFn(filepath, '', '');
        }
      }
    }
  };

  useEffect(() => {
    const lng = lang === Lang.ZH ? 'zh-CN' : lang;
    i18nChangeLanguage(lng);

    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return (
    <div style={{ border: '1px solid #ccc', zIndex: 100 }} className={cn('reset-editor-style', className)}>
      <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="simple" style={{ borderBottom: '1px solid #ccc' }} />
      <Editor
        defaultConfig={editorConfig}
        onCreated={(editor) => {
          setEditor(editor);
          onCreated?.(editor);
        }}
        defaultHtml={defaultHtml || ''}
        defaultContent={defaultContent || []}
        mode="default"
        value={value}
        style={{ height: '420px' }}
        onChange={onChange}
      />
    </div>
  );
};

export default TextEditor;
