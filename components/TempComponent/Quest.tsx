import { FC, useState, useEffect } from 'react';
import CMEditor from './Codemirror';
import { Block } from './Block';
// import { Button } from '@/component/Button';
// import API from '@/service/api/';

import correct from './plane-correct.png';
import Celebrate from './CelebrateCard';
import { Button } from './Button';
// https://github.com/replit/codemirror-lang-solidity/issues/2 solidity language's problem
const Quest: FC<{
  content: any[];
  darkMode?: boolean;
  source?: string;
  lessonID?: string;
  onPass: Function;
  isLastUnit: boolean;
  setIsProgressing?: Function;
}> = ({
  content,
  darkMode = true,
  onPass,
  setIsProgressing,
  source,
  lessonID,
  isLastUnit
}) => {
  const [codeText, setCodeText] = useState(
    '//code starts here\n\n//code ends here'
  );
  const [answerCode, setAnswerCode] = useState('');
  const [shouldRenderCodeEditor, setShouldRenderCodeEditor] = useState(false);
  const [shouldRenderBlock, setShouldRenderBlock] = useState(true);
  const [quiz, setQuiz] = useState(content?.length ? content[0] : null);
  const [errorLine, setErrorLine] = useState<number>();
  const [correctLines, setCorrectLines] = useState<number[]>([]);
  const [answerLineNumber, setAnswerLineNumber] = useState<number[]>([]);
  const [answerReg, setAnswerReg] = useState<RegExp[]>([]);
  const [codeWrong, setCodeWrong] = useState<boolean>();
  const [passed, setPassed] = useState(false);
  const [toggleAnswer, setToggleAnswer] = useState(false);
  const [tempCode, setTempCode] = useState('');
  const [celebrate, setCelebrate] = useState(false);
  useEffect(() => {
    const quiz = content?.[0];
    console.log(`source: `, source);
    // debugger;
    if (quiz && source !== 'guide-project') {
      setQuiz(quiz);
      console.log(quiz, quiz?.type);
      // debugger;
      if (quiz[quiz.type]?.rich_text?.[0]?.plain_text?.trim() === 'IDE') {
        setShouldRenderBlock(false);
      }
      if (
        (quiz?.has_children && quiz?.children?.[0]?.type === 'code') ||
        quiz?.type === 'code'
      ) {
        setShouldRenderCodeEditor(true);
        let quizCode = String.raw`${quiz?.children?.[0]?.code.rich_text
          ?.map((v: any) => v.plain_text)
          .join('')}`;
        console.log(`quizCode: `, quizCode);
        // debugger;
        // //code starts here
        // pragma solidity ^0.8.4;
        // //code ends here
        // //regex starts here
        // ^pragma\s+solidity\s*\^\s*0\s*.\s*8\s*.\s*4\s*;\s*$
        // //regex ends here
        const m = [
          ...quizCode.matchAll(
            /\/\/regex starts here\s+(((.|\n)*?))\s+\/\/regex ends here/gim
          )
        ];
        if (m.length) {
          setAnswerReg(m.map((i) => new RegExp(i[1].trim())));
        }

        // remove regex part
        quizCode = quizCode.replace(
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
        // look-behind and look-ahead, remove inner part of code block
        quizCode = quizCode.replace(
          /(?<=\/\/code starts here\s+)(((.|\n)*?))(?=\s+\/\/code ends here)/gim,
          ''
        );
        setCodeText(quizCode);
        // [example]:
        // contract Base {
        //     function foo() public virtual returns (uint256) { }
        // }

        // contract Derived is Base {
        // 		//code starts here
        //
        // 		//code ends here
        // }
      }
    } else if (quiz && source === 'guide-project') {
      setQuiz(quiz);
      console.log(quiz, quiz?.type);
      // debugger;
      if (quiz[quiz.type]?.rich_text?.[0]?.plain_text?.trim() === 'IDE') {
        setShouldRenderBlock(false);
      }
      if (quiz?.type === 'code') {
        setShouldRenderCodeEditor(true);
        let quizCode = String.raw`${quiz?.code.rich_text
          ?.map((v: any) => v.plain_text)
          .join('')}`;
        console.log(`quizCode: `, quizCode);
        // debugger;
        // //code starts here
        // pragma solidity ^0.8.4;
        // //code ends here
        // //regex starts here
        // ^pragma\s+solidity\s*\^\s*0\s*.\s*8\s*.\s*4\s*;\s*$
        // //regex ends here
        const m = [
          ...quizCode.matchAll(
            /\/\/regex starts here\s+(((.|\n)*?))\s+\/\/regex ends here/gim
          )
        ];
        if (m.length) {
          setAnswerReg(m.map((i) => new RegExp(i[1].trim())));
        }

        // remove regex part
        quizCode = quizCode.replace(
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
        // look-behind and look-ahead, remove inner part of code block
        quizCode = quizCode.replace(
          /(?<=\/\/code starts here\s+)(((.|\n)*?))(?=\s+\/\/code ends here)/gim,
          ''
        );
        setCodeText(quizCode);
        // [example]:
        // contract Base {
        //     function foo() public virtual returns (uint256) { }
        // }

        // contract Derived is Base {
        // 		//code starts here
        //
        // 		//code ends here
        // }
      }
    } else {
    }
  }, [content]);

  useEffect(() => {
    if (passed && !isLastUnit) {
      setTimeout(() => {
        document
          .querySelector('.passed-container-main')!
          .classList.add('fadeIn');
      });
      setIsProgressing && setIsProgressing(true);
      // should go next lesson after animation done
      setTimeout(() => {
        goNext();
        setIsProgressing && setIsProgressing(false);
        document
          .querySelector('.passed-container-main')!
          .classList.remove('fadeIn');
      }, 1600);
    } else if (passed && isLastUnit) {
      setCelebrate(true);
    }
  }, [passed]);
  const handleSubmit = () => {
    if (!shouldRenderCodeEditor) {
      setPassed(true);
      return;
    }
    const lines = codeText.split('\n');
    let isCodingBlock = false,
      isWrong = false,
      ai = 0;
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (/^\s*\/\/code starts here/.test(line)) {
        isCodingBlock = true;
        continue;
      }
      if (isCodingBlock) {
        if (/^\s*\/\/code ends here/.test(line)) {
          isCodingBlock = false;
          continue;
        }

        // check answer
        if (answerReg[ai]) {
          if (!answerReg[ai].test(line.trim())) {
            isWrong = true;
            setErrorLine(i + 1);
            break;
          }
          ai++;
        }
      }
    }
    setCodeWrong(isWrong);
    if (!isWrong) {
      setErrorLine(undefined); // remove error line
      setPassed(true);

      console.log(`lessonID: `, lessonID);
      // debugger;
      // 请求接口
      // API.progressFinish(
      //   `${source === 'guide-project' ? 'guidedProjectStep' : 'syntaxLesson'}`,
      //   {
      //     lessonID: lessonID
      //   }
      // )
      //   .then((res) => {
      //     console.log(`res: `, res);
      //     // debugger;
      //   })
      //   .catch((e) => {
      //     console.log(`e: `, e);
      //     // debugger;
      //   });
    }
  };

  const showAnswer = () => {
    setErrorLine(undefined);
    if (!toggleAnswer) {
      setTempCode(codeText);
      setCodeText(answerCode);
      setCorrectLines(answerLineNumber);
    } else {
      setCorrectLines([]);
      setCodeText(tempCode);
      setTempCode('');
    }

    setToggleAnswer(!toggleAnswer);
  };

  const handleTryAgain = () => {
    setErrorLine(undefined);
    setCorrectLines([]);
    setCodeWrong(false);
    setToggleAnswer(false);
    if (tempCode) {
      setCodeText(tempCode);
      setTempCode('');
    }
  };

  const goNext = () => {
    setErrorLine(undefined);
    setCorrectLines([]);
    setCodeWrong(false);
    setPassed(false);

    setIsProgressing?.(true);
    setToggleAnswer(false);
    onPass();
    setCodeText('//code starts here\n\n//code ends here');
  };

  return (
    <>
      <div className="lesson-quiz">
        {/*<div className='passed-container !hidden'>*/}
        {/*  <div className='passed-title'>Good Job! </div>*/}
        {/*  <div className='passed-subtitle'>Your answer are all correct.</div>*/}
        {/*  <img className='passed-img' src={correct} alt={``} />*/}
        {/*</div>*/}

        {passed ? (
          <div className={`passed-container passed-container-main opacity-0 `}>
            <div className="passed-title">Good Job!</div>
            <div className="passed-subtitle">Your answer are all correct.</div>
            <img className="passed-img" src={correct as any} alt={``} />
          </div>
        ) : (
          <div className="lesson-quiz-content">
            {shouldRenderBlock && quiz && <Block block={quiz} />}
            {shouldRenderCodeEditor && (
              <CMEditor
                setCodeText={setCodeText}
                codeText={codeText}
                errorLine={errorLine}
                setErrorLine={setErrorLine}
                correctLines={correctLines}
                darkMode={darkMode}
              />
            )}
          </div>
        )}
        {codeWrong ? (
          <div className="lesson-btns">
            <Button
              type={0}
              width="100%"
              darkMode={darkMode}
              click={handleTryAgain}
            >
              Try Again
            </Button>
            <Button
              type={0}
              width="100%"
              darkMode={darkMode}
              click={showAnswer}
            >
              {toggleAnswer ? 'Hide the answer' : 'Show me the answer'}
            </Button>
          </div>
        ) : (
          !passed && (
            <Button
              type={2}
              width="100%"
              darkMode={darkMode}
              click={handleSubmit}
            >
              {shouldRenderCodeEditor ? 'Check Answer' : 'Next'}
            </Button>
          )
        )}
      </div>
      {celebrate && (
        <>
          <div className="w-full h-full ">
            <Celebrate
              open={celebrate}
              close={() => {
                setCelebrate(false);
                setPassed(false);
              }}
              next={() => {
                setCelebrate(false);
                // setIsProgressing(true);
                goNext();
                setIsProgressing && setIsProgressing(false);
                // document.querySelector('.passed-container-main').classList.remove('fadeIn');
              }}
            ></Celebrate>
          </div>
          {/* <div className="w-[1600px] h-[897px] opacity-60 bg-black" /> */}
        </>
      )}
    </>
  );
};

export default Quest;
