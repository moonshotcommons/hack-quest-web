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
    const quiz = content?.[0];
    if (!quiz) return;
    setQuiz(quiz);

    if (quiz[quiz.type]?.rich_text?.[0]?.plain_text?.trim() === 'IDE') {
      setShouldRenderBlock(false);
    }

    setShouldRenderCodeEditor(true);
    let quizCode: any = null;
    if (courseType !== CourseType.GUIDED_PROJECT) {
      if (quiz?.children?.[0]?.type === 'code' || quiz?.type === 'code') {
        quizCode = String.raw`${quiz?.children?.[0]?.code.rich_text
          ?.map((v: any) => v.plain_text)
          .join('')}`;
      }
    } else {
      if (quiz?.type === 'code') {
        quizCode = String.raw`${quiz?.code.rich_text
          ?.map((v: any) => v.plain_text)
          .join('')}`;
      }
    }
    if (
      (quizCode &&
        quiz?.has_children &&
        quiz?.children?.[0]?.type === 'code') ||
      quiz?.type === 'code'
    ) {
      const m = [
        ...quizCode!.matchAll(
          /\/\/regex starts here\s+(((.|\n)*?))\s+\/\/regex ends here/gim
        )
      ];
      if (m.length) {
        setAnswerReg(m.map((i) => new RegExp(i[1].trim())));
      }

      // remove regex part
      quizCode = quizCode!.replace(
        /^\s*\/\/regex starts here(((.|\n)*?))\/\/regex ends here\s*$/gim,
        ''
      );
      setAnswerCode(quizCode);
      // get answer code line numbers
      const tempLines = quizCode.split('\n');
      let isCodingBlock = false;
      let lineNumbers = [];
      for (let i = 0; i < tempLines.length; i++) {
        const line = tempLines[i];
        if (/^\s*\/\/code starts here/.test(line)) {
          isCodingBlock = true;
          continue;
        }
        if (isCodingBlock) {
          if (/^\s*\/\/code ends here/.test(line)) {
            isCodingBlock = false;
            continue;
          }
          lineNumbers.push(i + 1);
        }
      }
      setAnswerLineNumber([...lineNumbers]);
      quizCode = quizCode.replace(
        /(?<=\/\/code starts here\s+)(((.|\n)*?))(?=\s+\/\/code ends here)/gim,
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
