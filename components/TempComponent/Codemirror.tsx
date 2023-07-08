import { FC, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { xcodeLight, xcodeDarkInit } from '@uiw/codemirror-theme-xcode';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { classname } from '@uiw/codemirror-extensions-classname';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { solidity } from '@replit/codemirror-lang-solidity';
import styled from 'styled-components';

// import './codemirror.scss';

const CustomCodeMirror = styled(CodeMirror)`
  .abc {
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }

    .cm-editor {
      cm-scroller::-webkit-scrollbar {
        display: none;
      }
      cm-scroller::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const baseTheme = EditorView.baseTheme({
  '.cm-error-line': {
    backgroundColor: '#ff474766 !important'
  },
  '.cm-answer-line': {
    backgroundColor: '#30cba280 !important'
  },
  '.cm-line': {
    whiteSpace: 'break-spaces'
  }
});

interface Props {
  codeText: string;
  errorLine?: number;
  darkMode?: boolean;
  setCodeText?: Function;
  setErrorLine?: Function;
  correctLines?: number[];
  codeLine: number;
}

const CMEditor: FC<Props> = (props) => {
  const {
    codeText,
    setCodeText,
    errorLine,
    correctLines,
    setErrorLine,
    codeLine,
    darkMode = true
  } = props;
  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    setCodeText && setCodeText(value);
    setErrorLine && setErrorLine(undefined);
  }, []);
  const classnameExt = classname({
    add: (lineNumber) => {
      if (lineNumber === errorLine) {
        return 'cm-error-line';
      }
      if (correctLines?.length && correctLines.includes(lineNumber)) {
        return 'cm-answer-line';
      }
      return '';
    }
  });

  const codeEditRef = useRef<any>();

  console.log(codeText, 'CODEtEXT');

  useLayoutEffect(() => {
    // 隐藏滚动条
    if (codeEditRef.current.editor) {
      if (codeEditRef.current.editor.querySelector) {
        (
          codeEditRef.current.editor.querySelector(
            '.cm-scroller'
          ) as HTMLElement
        )?.classList?.add('no-scrollbar');
      }
    }
  }, [codeEditRef]);

  return (
    <CodeMirror
      ref={codeEditRef as any}
      className="codemirror-container"
      value={codeText}
      autoFocus
      extensions={[
        solidity,
        baseTheme,
        classnameExt,

        basicSetup({
          indentOnInput: true,
          // lineWrapping: true,
          lineNumbers: true,

          // showCursorWhenSelecting: true,
          lintKeymap: true,
          autocompletion: true,
          closeBracketsKeymap: true,
          completionKeymap: true,
          highlightSelectionMatches: true
        })
      ]}
      maxHeight="56vh"
      minHeight="56vh"
      onChange={onChange}
      theme={
        darkMode
          ? xcodeDarkInit({
              settings: {
                background: '#111',
                gutterBackground: '#111'
              }
            })
          : xcodeLight
      }
    />
  );
};
// options={``}

export default CMEditor;
