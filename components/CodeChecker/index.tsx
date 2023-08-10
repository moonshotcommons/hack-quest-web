import { FC, ReactNode } from 'react';
import CodeEditor from './CodeEditor';
import { Quiz } from './type';
import { CourseType } from '@/service/webApi/course/type';
import { useParseQuiz } from '@/hooks/useParseQuiz';
import { Block } from '../TempComponent/Block';

interface CodeCheckerProps {
  content: Quiz[];
  courseType: CourseType;
}

const CodeChecker: FC<CodeCheckerProps> = (props) => {
  const { content, courseType } = props;
  // const {
  //   codeText,
  //   codeTextDispatch,
  //   quiz,
  //   shouldRenderBlock,
  //   shouldRenderCodeEditor,
  //   answerReg,
  //   answerCode,
  //   answerLineNumber
  // } = useParseQuiz({
  //   content,
  //   courseType
  // });
  return (
    <div className="w-full h-full relative">
      {/* <div>
        {shouldRenderBlock && quiz && <Block block={quiz} />}
        {shouldRenderCodeEditor && <CodeEditor></CodeEditor>}
      </div> */}
    </div>
  );
};

export default CodeChecker;
