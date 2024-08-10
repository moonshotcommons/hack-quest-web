import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { ComponentRenderer, ComponentRendererProvider } from '@/components/ComponentRenderer';
import { PageType } from '@/components/ComponentRenderer/type';
import { cn } from '@/helper/utils';
import { DailyChallengeType } from '@/service/webApi/user/type';
import { ForwardRefRenderFunction, forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import DailyChallengeCustomRenderer from './DailyChallengeCustomRenderer';
import LineCountDown from './LineCountDown';
import DailyChallengeProvider from './DailyChallengeProvider';
import emitter from '@/store/emitter';
import webApi from '@/service';
import { useQueryClient } from '@tanstack/react-query';
import { errorMessage } from '@/helper/ui';
import Start from '@/components/Common/Icon/Start';
import LinkArrow from '@/components/Common/LinkArrow';
import Link from 'next/link';
import Image from 'next/image';

interface DailyChallengeModalProps {
  challengeData: DailyChallengeType;
}
export interface DailyChallengeModalInstance {
  open: VoidFunction;
}

export interface ButtonState {
  type: string;
  disable: boolean;
}

const DailyChallengeModal: ForwardRefRenderFunction<DailyChallengeModalInstance, DailyChallengeModalProps> = (
  { challengeData },
  ref
) => {
  const [open, setOpen] = useState(false);
  const [buttonState, setButtonState] = useState({
    type: 'submit',
    disable: true
  });
  const [stop, setStop] = useState(false);
  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          setOpen(true);
        }
      };
    },
    []
  );

  const [currentChallenge, setCurrentChallenge] = useState(0);
  const queryClient = useQueryClient();
  const [end, setEnd] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const links = useMemo(() => {
    let links: DailyChallengeType['challenges'][number]['links'] = [];
    challengeData.challenges.forEach((cha, index) => {
      if (index > 0) return;
      links = links.concat(cha.links);
    });
    return links;
  }, [challengeData]);

  const handleClick = () => {
    if (!buttonState.disable && buttonState.type === 'submit') {
      emitter.emit('submit');
      return;
    }

    if (challengeData.completed) {
      setIsCompleted(true);
      return;
    }

    if (!buttonState.disable && buttonState.type !== 'submit') {
      setCurrentChallenge(challengeData.progress);
    }
  };

  const onChallengePass = async () => {
    try {
      setStop(true);
      await webApi.userApi.updateDailyChallenge(true);
      queryClient.invalidateQueries({ queryKey: ['daily-challenge'] });
    } catch (err) {
      errorMessage(err);
    }
  };

  useEffect(() => {
    setStop(false);
    setEnd(false);
    setButtonState({
      type: 'submit',
      disable: true
    });
  }, [currentChallenge]);

  useEffect(() => {
    setCurrentChallenge(challengeData.progress);
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      showCloseIcon
      icon={
        <svg
          className="mr-4 mt-4"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.7099 20.2902C21.8993 20.478 22.0057 20.7336 22.0057 21.0002C22.0057 21.2668 21.8993 21.5224 21.7099 21.7102C21.5222 21.8995 21.2666 22.006 20.9999 22.006C20.7333 22.006 20.4777 21.8995 20.2899 21.7102L11.9999 13.4102L3.70994 21.7102C3.52217 21.8995 3.26658 22.006 2.99994 22.006C2.7333 22.006 2.47771 21.8995 2.28994 21.7102C2.10063 21.5224 1.99414 21.2668 1.99414 21.0002C1.99414 20.7336 2.10063 20.478 2.28994 20.2902L10.5899 12.0002L2.28994 3.71021C2.03628 3.45655 1.93722 3.08683 2.03006 2.74033C2.12291 2.39383 2.39356 2.12318 2.74006 2.03033C3.08657 1.93748 3.45628 2.03655 3.70994 2.29021L11.9999 10.5902L20.2899 2.29021C20.6821 1.89809 21.3178 1.89809 21.7099 2.29021C22.1021 2.68233 22.1021 3.31809 21.7099 3.71021L13.4099 12.0002L21.7099 20.2902Z"
            fill="#131313"
          />
        </svg>
      }
      rootClassName="p-0"
    >
      <div
        className={cn(
          'flex h-screen max-h-screen  w-screen flex-col items-center justify-center',
          isCompleted ? 'bg-yellow-extra-light' : 'bg-white'
        )}
      >
        {!isCompleted && (
          <div className="flex max-h-[calc(100vh-80px)] w-full max-w-[62.5rem] flex-col items-center justify-center gap-16 py-20">
            <LineCountDown
              second={20}
              stop={stop}
              dep={currentChallenge}
              onEnd={async () => {
                try {
                  if (stop) return;
                  setEnd(true);
                  setButtonState({
                    disable: false,
                    type: 'next'
                  });
                  await webApi.userApi.updateDailyChallenge(false);
                  queryClient.invalidateQueries({ queryKey: ['daily-challenge'] });
                } catch (err) {
                  errorMessage(err);
                }
              }}
            />

            {end && <p className="body-m-bold -mb-12 -mt-8 text-status-error-dark">Times Up!</p>}

            <div className="body-l-bold text-neutral-off-black">
              Question {currentChallenge + 1} / {challengeData.challenges.length}
            </div>

            <DailyChallengeProvider
              buttonState={buttonState}
              updateButtonState={(state) => {
                setButtonState({ ...buttonState, ...state });
              }}
              end={end}
              onChallengePass={onChallengePass}
            >
              <ComponentRendererProvider type={PageType.UGC} CustomComponentRenderer={DailyChallengeCustomRenderer}>
                <div>
                  {challengeData.challenges.map((challenge, index) => {
                    if (currentChallenge !== index) return null;
                    return (
                      <ComponentRenderer
                        parent={challenge}
                        key={challenge.id}
                        component={challenge.content}
                        prevComponent={null}
                        nextComponent={null}
                        position={0}
                      ></ComponentRenderer>
                    );
                  })}
                </div>
              </ComponentRendererProvider>
            </DailyChallengeProvider>
            <div className="flex w-full justify-end">
              <Button
                type="primary"
                disabled={buttonState.disable}
                className={cn('button-text-m w-[13.5rem] px-0 py-[.875rem] uppercase', {
                  'bg-neutral-light-gray text-neutral-medium-gray opacity-100':
                    buttonState.disable && buttonState.type === 'submit'
                })}
                onClick={handleClick}
              >
                {buttonState.type}
              </Button>
            </div>
          </div>
        )}
        {isCompleted && (
          <div
            className="flex max-h-[calc(100vh-80px)] w-full max-w-[58.5rem] flex-col items-center justify-center gap-16 overflow-y-auto py-20"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-6 text-yellow-dark">
                {challengeData.challenges.map((item, index) => {
                  if (index > challengeData.correct - 1) {
                    return <Start key={index} />;
                  }
                  return <Start key={index} fill></Start>;
                })}
              </div>
              <p className="text-h2 text-neutral-off-black">Great Job!</p>
              <p className="body-m text-neutral-rich-gray">
                {challengeData.challenges.length === challengeData.correct && 'You got all the questions right'}
              </p>
              <p className="body-m text-neutral-rich-gray">
                {challengeData.challenges.length > challengeData.correct && 'Claim rewards for today’s quiz'}
              </p>
            </div>
            <div className="flex flex-col items-center gap-8">
              <Image
                src={'/images/home/treasure_box.svg'}
                alt={'chest-cover'}
                width={142}
                height={120}
                className="cursor-pointer transition-all"
              />
              <Button type="primary" className="button-text-m w-[13.5rem] px-0 py-4">
                OPEN
              </Button>
            </div>
            <div className="flex w-full flex-col gap-4">
              {links.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 rounded-[16px] bg-neutral-white p-4"
                  >
                    <div className="flex flex-col gap-2">
                      <p className="body-m-bold">{item.title}</p>
                      <p className="body-s">{item.description}</p>
                      <Link href={item.link}>
                        <LinkArrow>Start learning</LinkArrow>
                      </Link>
                    </div>
                    <svg width="82" height="51" viewBox="0 0 82 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M36.8651 12.2935C36.8651 8.7839 34.029 5.94482 30.5336 5.94482H0.763306V41.6163H23.9364C27.5077 41.6163 30.4055 44.522 30.4055 48.1029V48.4215H43.3248V48.1029C43.3248 44.522 46.2226 41.6163 49.7939 41.6163H72.967V5.94482H43.1967C39.6966 5.94482 36.8651 8.78866 36.8651 12.2935Z"
                        fill="white"
                        stroke="black"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M37.1164 7.34868C37.1164 3.83907 34.2802 1 30.7848 1H5.44901V37.3753H27.849C31.4203 37.3753 34.3181 40.281 34.3181 43.8619V44.1805H39.9193V43.8619C39.9193 40.281 42.8172 37.3753 46.3885 37.3753H68.7885V1H43.4527C39.9525 1 37.1211 3.84383 37.1211 7.34868H37.1164Z"
                        fill="white"
                        stroke="black"
                        strokeMiterlimit="10"
                      />
                      <path d="M37.0775 7.63818V40.4381" stroke="black" stroke-dasharray="6 6" />
                      <path
                        d="M53.0865 22.0864L61.9723 49L66.4762 35.4762L80 30.9722L53.0865 22.0864Z"
                        fill="#FFE866"
                        stroke="black"
                        strokeMiterlimit="10"
                      />
                      <path d="M62.7515 31.5881L57.2294 26.0659" stroke="black" strokeMiterlimit="10" />
                      <path d="M50.0505 18.8874L43.9761 12.813" stroke="black" strokeMiterlimit="10" />
                      <path d="M62.1989 13.3647L56.6767 18.8869" stroke="black" strokeMiterlimit="10" />
                      <path d="M49.4985 26.0659L43.9763 31.5881" stroke="black" strokeMiterlimit="10" />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default forwardRef(DailyChallengeModal);
