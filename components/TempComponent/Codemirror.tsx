import { useCallback } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { xcodeLight, xcodeDarkInit } from '@uiw/codemirror-theme-xcode';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { classname } from '@uiw/codemirror-extensions-classname';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { solidity } from '@replit/codemirror-lang-solidity';

// import './codemirror.scss';

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

function CMEditor({
  codeText,
  setCodeText,
  errorLine,
  correctLines,
  setErrorLine,
  darkMode = true
}: {
  codeText: string;
  errorLine?: number;
  darkMode?: boolean;
  setCodeText?: Function;
  setErrorLine?: Function;
  correctLines?: number[];
}) {
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
  return (
    <CodeMirror
      className="codemirror-container"
      value={codeText}
      extensions={[
        solidity,
        baseTheme,
        classnameExt,
        basicSetup({
          indentOnInput: true,
          lineWrapping: true,
          showCursorWhenSelecting: true,
          autocompletion: true,
          closeBracketsKeymap: true,
          completionKeymap: true
          // highlightSelectionMatches: true
        })
      ]}
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
}
// options={``}

export default CMEditor;
