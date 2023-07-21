import { Quiz } from '@/components/CodeChecker/type';
import { CourseType } from '@/service/webApi/course/type';
import { useEffect, useState } from 'react';

interface Options {
  content: any[];
  courseType: CourseType;
}

const useParseCodeText = () => {};

export const useParseQuiz = (options: Options) => {
  const { content, courseType } = options;
  const [codeText, setCodeText] = useState(
    '//code starts here\n\n//code ends here\n'
  );
  const [quiz, setQuiz] = useState<Quiz>();
  const [shouldRenderBlock, setShouldRenderBlock] = useState(true);
  const [shouldRenderCodeEditor, setShouldRenderCodeEditor] = useState(false);
  const [answerReg, setAnswerReg] = useState<RegExp[]>([]);
  const [answerCode, setAnswerCode] = useState('');
  const [answerLineNumber, setAnswerLineNumber] = useState<number[]>([]);
  useEffect(() => {
    let quiz = content?.[0];
    if (!quiz) return;

    let codeBlock: any;

    quiz.children = quiz.children.filter((item: any, index: number) => {
      if (item.type === 'code') codeBlock = item;
      return item.type !== 'code';
    });

    setQuiz(quiz);

    // if (quiz[quiz.type]?.rich_text?.[0]?.plain_text?.trim() === 'IDE') {
    //   setShouldRenderBlock(false);
    // }

    setShouldRenderCodeEditor(true);
    let quizCode: any = null;
    // if (courseType !== CourseType.GUIDED_PROJECT) {
    //   if (quiz?.children?.[0]?.type === 'code' || quiz?.type === 'code') {
    //     quizCode = String.raw`${quiz?.children?.[0]?.code.rich_text
    //       ?.map((v: any) => v.plain_text)
    //       .join('')}`;
    //   }
    // } else {
    //   if (quiz?.type === 'code') {
    //     quizCode = String.raw`${quiz?.code.rich_text
    //       ?.map((v: any) => v.plain_text)
    //       .join('')}`;
    //   }
    // }
    if (!codeBlock) return;

    quizCode = String.raw`${codeBlock.code.rich_text
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
      // get answer code line numbers
      const tempLines = quizCode.split('\n');
      let isCodingBlock = false;
      let lineNumbers = [];
      for (let i = 0; i < tempLines.length; i++) {
        const line = tempLines[i];
        if (/^\s*\/\/\s?code starts here/.test(line)) {
          isCodingBlock = true;
          continue;
        }
        if (isCodingBlock) {
          if (/^\s*\/\/\s?code ends here/.test(line)) {
            isCodingBlock = false;
            continue;
          }
          lineNumbers.push(i + 1);
        }
      }
      setAnswerLineNumber([...lineNumbers]);
      quizCode = quizCode.replace(
        /(?<=\/\/\s?code starts here\s+)(((.|\n)*?))(?=\s+\/\/\s?code ends here)/gim,
        ''
      );
      setCodeText(quizCode);
    }
  }, [content]);
  return {
    codeText,
    codeTextDispatch: setCodeText,
    quiz,
    quizDispatch: setQuiz,
    shouldRenderBlock,
    shouldRenderBlockDispatch: setShouldRenderBlock,
    shouldRenderCodeEditor,
    shouldRenderCodeEditorDispatch: setShouldRenderCodeEditor,
    answerReg,
    answerRegDispatch: setAnswerReg,
    answerCode,
    answerCodeDispatch: setAnswerCode,
    answerLineNumber,
    answerLineNumberDispatch: setAnswerLineNumber
  };
};
