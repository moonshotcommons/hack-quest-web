import { FC, useState, useEffect, ReactNode, useLayoutEffect } from 'react';
import CMEditor from './Codemirror';
import { Block } from './Block';
// import API from '@/service/api/';

import correct from './plane-correct.png';
import Celebrate from './CelebrateCard';
import Button, { ButtonProps } from '../Common/Button';
import { useParseQuiz } from '@/hooks/useParseQuiz';
import { CourseType } from '@/service/webApi/course/type';

// https://github.com/replit/codemirror-lang-solidity/issues/2 solidity language's problem

const CustomButton: FC<ButtonProps> = (props) => {
  const { children } = props;
  return (
    <Button
      padding="px-[3rem] py-[1.25rem]"
      fontStyle="Inter font-normal"
      textStyle="text-[.875rem] text-white leading-[1.25rem]"
      {...props}
      className="border"
    >
      {children}
    </Button>
  );
};

const Quest: FC<{
  content: any[];
  darkMode?: boolean;
  courseType: CourseType;
  lessonID?: string;
  onPass: Function;
  isLastUnit: boolean;
  setIsProgressing?: Function;
}> = ({
  content,
  darkMode = true,
  onPass,
  setIsProgressing,
  courseType,
  lessonID,
  isLastUnit
}) => {
  const [errorLines, setErrorLines] = useState<number[]>([]);
  const [correctLines, setCorrectLines] = useState<number[]>([]);
  const [codeWrong, setCodeWrong] = useState<boolean>();
  const [passed, setPassed] = useState(false);
  const [toggleAnswer, setToggleAnswer] = useState(false);
  const [tempCode, setTempCode] = useState('');
  const [celebrate, setCelebrate] = useState(false);

  const {
    codeText,
    codeTextDispatch,
    quiz,
    shouldRenderBlock,
    shouldRenderCodeEditor,
    answerReg,
    answerCode,
    answerLineNumber
  } = useParseQuiz({
    content,
    courseType
  });

  const [codeLine, setCodeLine] = useState(
    () => 32 - codeText?.split('\n').length
  );

  // useLayoutEffect(() => {
  //   let codeLen = codeText?.split('\n').length;
  //   if (codeLen < 32) {
  //     setCodeLine(32 - codeLen);
  //   }
  // }, [codeText]);

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
    let lines = codeText.split('\n');
    let isCodingBlock = false,
      isWrong = false,
      ai = 0;

    // let startIndex = 0;
    // let endIndex = lines.length - 1;
    // lines.forEach((line, index) => {
    //   if (line === '//code starts here') {
    //     startIndex = index;
    //   }
    //   if (line === '//code ends here') {
    //     endIndex = index;
    //   }
    // });

    // lines = lines.slice(startIndex, endIndex);

    const newLine = [];
    const newErrorLines: any[] = [];
    let tempLine = [];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (/^\s*\/\/\s?code starts here/.test(line)) {
        isCodingBlock = true;
        tempLine = [];
        continue;
      }
      if (isCodingBlock) {
        if (/^\s*\/\/\s?code ends here/.test(line)) {
          isCodingBlock = false;
          newLine.push(tempLine);
          tempLine = [];
          continue;
        }
        newErrorLines.push(i + 1);
        tempLine.push(line);
        // check answer
        // if (answerReg[ai]) {
        //   if (!answerReg[ai].test(line.trim())) {
        //     isWrong = true;
        //     setErrorLine(i + 1);
        //     break;
        //   }
        //   ai++;
        // }
      }
    }

    // if (answerReg[ai]) {
    //   if (!answerReg[ai].test(newLine.join('').trim())) {
    //     isWrong = true;
    //     setErrorLines(newErrorLines);
    //   }
    //   // ai++;
    // }

    // answerReg.forEach((item) => {});
    let tempAnswerReg = [...answerReg];
    newLine.forEach((line) => {
      const regIndex = tempAnswerReg.findIndex((reg) =>
        reg.test(line.join('').trim())
      );
      if (regIndex === -1) {
        // isWrong = true;
        // setErrorLines(newErrorLines);
      } else {
        answerReg.splice(regIndex, 1);
      }
    });

    if (answerReg.length) {
      isWrong = true;
      setErrorLines(newErrorLines);
    }

    setCodeWrong(isWrong);
    if (!isWrong) {
      setErrorLines([]); // remove error line
      setPassed(true);

      // console.log(`lessonID: `, lessonID);
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
    setErrorLines([]);
    if (!toggleAnswer) {
      setTempCode(codeText);
      codeTextDispatch(answerCode);
      setCorrectLines(answerLineNumber);
    } else {
      setCorrectLines([]);
      codeTextDispatch(tempCode);
      setTempCode('');
    }

    setToggleAnswer(!toggleAnswer);
  };

  const handleTryAgain = () => {
    setErrorLines([]);
    setCorrectLines([]);
    setCodeWrong(false);
    setToggleAnswer(false);
    if (tempCode) {
      codeTextDispatch(tempCode);
      setTempCode('');
    }
  };

  const goNext = () => {
    setErrorLines([]);
    setCorrectLines([]);
    setCodeWrong(false);
    setPassed(false);

    setIsProgressing?.(true);
    setToggleAnswer(false);
    onPass();
    codeTextDispatch('//code starts here\n\n//code ends here');
  };

  return (
    <>
      <div className="h-full w-full">
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
          <div className="lesson-quiz-content h-[100%]">
            <div className="">
              <div className="text-[#F2F2F2] font-next-book-bold text-[1rem]">
                Quest
              </div>
              <div className="py-[1.5rem]">
                {shouldRenderBlock &&
                  quiz &&
                  quiz.children?.map((child, index: number) => {
                    return (
                      <Block key={index} block={child} renderChildren={true} />
                    );
                  })}
              </div>
            </div>
            {shouldRenderCodeEditor && (
              <div>
                <div className="text-[#F2F2F2] font-next-book-bold text-[1rem]">
                  Try answers below
                </div>
                <div className="mt-[1.5rem]">
                  <CMEditor
                    setCodeText={codeTextDispatch}
                    codeText={codeText}
                    codeLine={codeLine}
                    errorLines={errorLines}
                    setErrorLines={setErrorLines}
                    correctLines={correctLines}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {codeWrong ? (
          <div className="absolute bottom-[6.5rem] right-[7.5rem] flex gap-[1.25rem] justify-end z-[99999] ">
            <CustomButton type={0} onClick={handleTryAgain}>
              Try Again
            </CustomButton>
            {!toggleAnswer && (
              <CustomButton type={0} onClick={showAnswer}>
                {/* {toggleAnswer ? 'Hide the answer' : 'Show me the answer'} */}
                {'Show me the answer'}
              </CustomButton>
            )}
          </div>
        ) : (
          !passed && (
            <div className="absolute bottom-[7.5rem] right-[7.5rem] flex gap-[1.25rem] justify-end z-[99999]">
              <CustomButton type={2} onClick={handleSubmit}>
                {shouldRenderCodeEditor ? 'Check Answer' : 'Next'}
              </CustomButton>
            </div>
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
