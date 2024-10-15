import Button from '@/components/Common/Button';
import { FC, useRef } from 'react';
import { LocalStorageKey } from '@/constants/enum';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import Image from 'next/image';
import CostCoinModal, { CostCoinModalRef } from '@/components/Web/Business/CostCoinModal';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';

interface QuizFooterProps {
  showAnswer: boolean;
  setShowAnswer: (showAnswer: boolean) => void;
  onSubmit: VoidFunction;
  submitDisable?: boolean;
  showHint: boolean;
  lessonId: string;
  includeHint: boolean;
  setShowHint: (showHint: boolean) => void;
  isCompleted: boolean;
}

const QuizFooter: FC<QuizFooterProps> = (props) => {
  const {
    showAnswer,
    setShowAnswer,
    onSubmit,
    showHint,
    setShowHint,
    includeHint,
    lessonId,
    isCompleted,
    submitDisable = false
  } = props;
  const ref = useRef<CostCoinModalRef>(null);
  const firstShowAnswer = useRef(true);
  const { updateUserCoin } = useGetMissionData();
  const { runAsync } = useRequest(
    () => {
      return webApi.courseApi.showAnswerCostCoin(lessonId);
    },
    {
      manual: true,
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const isCostCoin = firstShowAnswer.current && !showAnswer && !isCompleted;

  const showAnswerHandle = async () => {
    if (!showHint && includeHint) {
      setShowHint(true);
      return;
    }
    if (isCostCoin) {
      const showCostCoinModal = window.localStorage.getItem(LocalStorageKey.ShowAnswerCostCoinModal);
      const show = !showCostCoinModal || showCostCoinModal === 'show';
      if (show) {
        ref.current?.open({
          onConfirm: runAsync,
          onConfirmCallback: () => {
            firstShowAnswer.current = false;
            setShowAnswer(!showAnswer);
          }
        });

        return;
      }
      try {
        await runAsync();
        await updateUserCoin();
        firstShowAnswer.current = false;
        setShowAnswer(!showAnswer);
      } catch (err) {
        // errorMessage(err);
      }
    } else {
      setShowAnswer(!showAnswer);
    }
  };

  const { run: submit, loading } = useRequest(
    async () => {
      return onSubmit();
    },
    {
      manual: true
    }
  );

  return (
    <div className="flex items-center justify-between">
      <div
        className="cursor-pointer text-neutral-rich-gray transition hover:text-neutral-black"
        onClick={showAnswerHandle}
      >
        {showAnswer && <span className="underline">Hide Answer</span>}
        {(!includeHint || showHint) && !showAnswer && (
          <span className="flex gap-[2px]">
            <span className="underline">Show Answer</span>
            {isCostCoin && (
              <span className="flex gap-px no-underline">
                {`(-10 `}
                <Image src={'/images/mission-center/icon_coin_new.svg'} alt="coin" width={16} height={16} />
                {`)`}
              </span>
            )}
          </span>
        )}
        {includeHint && !showHint && !showAnswer && <span className="underline">Show Hint</span>}
      </div>
      <Button
        type="primary"
        className={`body-s px-[40px] py-[8px] text-neutral-black ${submitDisable ? 'cursor-not-allowed opacity-40' : ''}`}
        disabled={submitDisable}
        loading={loading}
        onClick={() => submit()}
      >
        Submit
      </Button>
      <CostCoinModal coin={10} ref={ref} />
    </div>
  );
};

export default QuizFooter;
