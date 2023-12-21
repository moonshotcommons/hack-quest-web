import { Quiz } from '@/components/v1/CodeChecker/type';
import { ReactNode, useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { reservedWords } from '@/constants/solidity';

export interface AnswerState {
  id: string;
  value: string;
  inputValue: string;
  answer: string;
}
export interface WaitingRenderCodeType {
  type: string;
  render: (answerState: AnswerState[]) => ReactNode;
}

interface Options {
  content: any[];
  // courseType: CourseType;
}

const AnswerInput = (props: {
  uuid: string;
  onChange: (id: string, v: string) => void;
}) => {
  return (
    <textarea
      placeholder="Type your answer here"
      type="text"
      style={{
        color: 'white',
        outline: 'none',
        borderRadius: '4px',
        backgroundColor: 'var(--lesson-code-editor-input-bg)',
        width: '100%',
        height: '40px',
        padding: '8px',
        resize: 'none' /* 禁止用户手动调整大小 */,
        overflow: 'hidden' /* 隐藏溢出的内容 */
      }}
      data-uuid={props.uuid}
      onInput={(e) => {
        const textarea = e.target as HTMLTextAreaElement;
        textarea.style.backgroundColor = 'var(--lesson-code-editor-input-bg)';
        const oldHeight = textarea.style.height;
        // 重置textarea的高度为默认值，以便可以正确计算其内容的高度
        textarea.style.height = 'inherit';

        // 获取textarea的内容高度，并加上padding和border的高度
        let height =
          textarea.scrollHeight + textarea.offsetHeight - textarea.clientHeight;
        let lineLen = textarea.value.split('\n').length;
        height = lineLen > 1 ? height : 40;
        // 将textarea的高度设置为内容高度
        textarea.style.height = height + 'px';
      }}
      onChange={(e) => {
        const currentId = e.target.dataset.uuid;
        const value = e.target.value;
        props.onChange(currentId!, value);
      }}
    ></textarea>
  );
};

const codeRender = (codes: any) => {
  return codes.map((code: string, index: number) => {
    if (reservedWords.includes(code) && code.trim()) {
      return (
        <span key={index} style={{ color: `var(--solidity-${code})` }}>
          {code + '\u00A0\u00A0'}
        </span>
      );
    }
    return code + '\u00A0\u00A0';
  });
};

export const useParseQuiz = (options: Options) => {
  const { content } = options;
  /** 等待渲染到界面的code */
  const [waitingRenderCodes, setWaitingRenderCodes] = useState<
    WaitingRenderCodeType[]
  >([]);

  const [quiz, setQuiz] = useState<Quiz>();
  /** 答案校验的正则 */
  const [answerReg, setAnswerReg] = useState<RegExp[]>([]);
  /** 移除正则后的code字符串 */
  const [answerCode, setAnswerCode] = useState('');
  /** 答案的实时状态 */
  const [answerState, setAnswerState] = useState<AnswerState[]>([]);

  const parseAnswerRegex = (codeBlock: any) => {
    let quizCode = String.raw`${codeBlock.code.rich_text
      ?.map((v: any) => v.plain_text)
      .join('')}`;

    if (quizCode) {
      const m = [
        ...quizCode!.matchAll(
          /\/\/\s?regex starts here\s+(((.|\n)*?))\s+\/\/\s?regex ends here/gim
        )
      ];

      if (m.length) {
        setAnswerReg(m.map((i) => new RegExp(i[1].trim())));
      }

      // remove regex part
      quizCode = quizCode!.replace(
        /^\s*\/\/\s?regex starts here(((.|\n)*?))\/\/\s?regex ends here\s*$/gim,
        ''
      );

      setAnswerCode(quizCode);
      return quizCode;
    }
  };

  /** 处理输入框在一行文本中间插入的情况 */
  const parseLineByCenterInsert = (line: string) => {};

  const parseLineBySingleLine = (lines: string[]) => {
    const uuid = uuidV4();
    const answer = {
      id: uuid,
      answer: lines.join('\n'),
      value: '',
      inputValue: ''
    };
    setAnswerState((state) => {
      return state.concat(answer);
    });
    const inputLine = {
      type: 'input',
      render(newAnswerState: AnswerState[]) {
        return (
          <AnswerInput
            uuid={uuid}
            onChange={(id, value) => {
              const currentLineState = newAnswerState.find(
                (item) => item.id === id
              );
              if (!currentLineState) return;
              setAnswerState((state) => {
                return state
                  .filter((item) => item.id !== id)
                  .concat({ ...currentLineState, value, inputValue: value });
              });
            }}
          ></AnswerInput>
        );
      }
    };
    return inputLine;
  };

  const parseLineByDefaultLine = (line: string) => {
    if (/^\s*\/\/.*/.test(line)) {
      // 处理注释行
      const spanLine = {
        type: 'span',
        render(newAnswerState: AnswerState[]) {
          return (
            <span style={{ color: 'rgb(96,139,78)' }}>
              {line.replaceAll(/ /g, '\u00A0\u00A0')}
            </span>
          );
        }
      };
      return spanLine;
    }

    const codes = line.split(' ');
    const spanLine = {
      type: 'span',
      render(newAnswerState: AnswerState[]) {
        return (
          // <span>{lineSource[j].replaceAll(/ /g, '\u00A0\u00A0')}</span>
          <span>{codeRender(codes)}</span>
        );
      }
    };

    return spanLine;
  };

  const parseWaitingRenderCodes = (waitLines: string[]) => {
    let isCodingBlock = false;
    const waitCodeRenderLines: {
      type: string;
      render: (newAnswerState: AnswerState[]) => ReactNode;
    }[] = [];
    let tempLines: string[] = [];
    for (let i = 0; i < waitLines.length; i++) {
      let waitLine = waitLines[i];

      // 单行中间有coding输入框的情况
      if (/(@@@)(((.|\n)*?))((###))/gim.test(waitLine)) {
        // 单行有输入框的情况，预留，暂时不处理
        const formatLine = parseLineByCenterInsert(waitLine);
        // waitCodeRenderLines.push(formatLine);
        continue;
      }

      // 标记coding输入框行的开始
      if (/^\s*?@@@/.test(waitLine)) {
        isCodingBlock = true;
        continue;
      }

      // 当前行是coding行
      if (isCodingBlock) {
        // 标记coding行结束
        if (/^\s*?###/.test(waitLine)) {
          isCodingBlock = false;
          const formatLine = parseLineBySingleLine(tempLines);
          waitCodeRenderLines.push(formatLine);
          tempLines = [];
          continue;
        }
        // 答案阶段
        tempLines.push(waitLine);
        continue;
      } else {
        // 处理普通文本行
        const formatLine = parseLineByDefaultLine(waitLine);
        waitCodeRenderLines.push(formatLine);
      }
    }
    setWaitingRenderCodes(waitCodeRenderLines);
  };

  useEffect(() => {
    let quiz = content?.[0];
    if (!quiz) return;
    let codeBlock: any;
    quiz.children = quiz.children.filter((item: any, index: number) => {
      if (item.type === 'code') codeBlock = item;
      return item.type !== 'code';
    });

    setQuiz(quiz);
    let quizCode: string;
    if (!codeBlock) return;

    // 解析正则表达式
    quizCode = parseAnswerRegex(codeBlock) as string;
    if (!quizCode) return;
    const waitLines = quizCode.split('\n');
    /** 解析要渲染的code和答案 */
    parseWaitingRenderCodes(waitLines);
  }, [content]);

  return {
    waitingRenderCodes,
    waitingRenderCodesDispatch: setWaitingRenderCodes,
    quiz,
    quizDispatch: setQuiz,
    answerReg,
    answerRegDispatch: setAnswerReg,
    answerCode,
    answerCodeDispatch: setAnswerCode,
    answerState
  };
};
