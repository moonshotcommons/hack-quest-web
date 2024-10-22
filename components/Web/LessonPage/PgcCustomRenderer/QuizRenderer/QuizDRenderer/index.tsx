import { CustomType, NotionComponentType, QuizAType } from '@/components/ComponentRenderer/type';
import { FC, useContext, useRef } from 'react';
import { PlaygroundContext } from '../../../Playground/type';
import QuizFooter from '../QuizFooter';
import { QuizContext } from '..';
import webApi from '@/service';

interface QuizDRendererProps {
  parent: CustomType | NotionComponentType;
  quiz: QuizAType;
}

const QuizDRenderer: FC<QuizDRendererProps> = (props) => {
  const { lesson } = useContext(PlaygroundContext);
  const iframe = useRef<HTMLIFrameElement>(null);
  const { onPass } = useContext(QuizContext);
  const pending = useRef(false);
  const submit = () => {
    return new Promise((resolve, reject) => {
      window.addEventListener('message', (event) => {
        const {
          type, // 类型。现在固定 questResult
          from, // 来源。现在固定 hackquest
          message // 错误信息。如果没有就是通过
        } = event.data;

        console.log(from, event.data);
        if (from === 'hackquest' && !message && !pending.current) {
          pending.current = true;
          webApi.courseApi.markQuestState(lesson.id, false).then(() => {
            onPass();
            resolve(null);
            pending.current = false;
          });
        } else reject(message);
      });

      iframe.current?.contentWindow &&
        iframe.current?.contentWindow?.postMessage('check result', 'https://remix.roudan.io');
    });
  };

  return (
    <div className="flex h-full w-full flex-col gap-6 text-black">
      <iframe
        ref={iframe}
        src={`https://remix.roudan.io/#lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.26+commit.8a97fa7a.js&theme=flatly&workspace=${lesson.id}`}
        className="mt-6 w-full flex-1"
      ></iframe>
      <QuizFooter
        showAnswer={false}
        submitDisable={false}
        setShowAnswer={() => {}}
        onSubmit={submit}
        includeHint={false}
        showHint={false}
        setShowHint={() => {}}
        isCompleted={false}
        lessonId={lesson.id}
      ></QuizFooter>
    </div>
  );
};

export default QuizDRenderer;
