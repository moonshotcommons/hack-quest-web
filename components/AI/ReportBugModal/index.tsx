import BugFeedbackModal, { BugFeedbackModalRef } from '@/components/Web/Business/FoundBugButton/BugFeedbackModal';
import ConnectDiscordModal, {
  ConnectDiscordModalRef
} from '@/components/Web/Business/FoundBugButton/ConnectDiscordModal';
import SuccessfulModal, { SuccessfulModalRef } from '@/components/Web/Business/FoundBugButton/SuccessfulModal';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { ForwardRefRenderFunction, RefObject, forwardRef, useImperativeHandle, useRef } from 'react';

interface ReportBugModalProps {
  refreshDiscordInfo: VoidFunction;
}

export interface ReportBugModalInstance {
  bugFeedbackModalRef: RefObject<BugFeedbackModalRef>;
  connectDiscordModalRef: RefObject<ConnectDiscordModalRef>;
}

const ReportBugModal: ForwardRefRenderFunction<ReportBugModalInstance, ReportBugModalProps> = (
  { refreshDiscordInfo },
  ref
) => {
  const pageId = useGlobalStore((state) => state.helperParams.pageId);

  const bugFeedbackModalRef = useRef<BugFeedbackModalRef>(null);
  const connectDiscordModalRef = useRef<ConnectDiscordModalRef>(null);
  const successfulModalRef = useRef<SuccessfulModalRef>(null);

  useImperativeHandle(ref, () => {
    return {
      bugFeedbackModalRef,
      connectDiscordModalRef
    };
  });

  return (
    <div>
      <ConnectDiscordModal
        ref={connectDiscordModalRef}
        onConnectLater={() => {
          bugFeedbackModalRef.current?.onCommit(pageId ? { lessonId: pageId } : undefined);
          refreshDiscordInfo();
        }}
        onConnectSuccess={() => {
          bugFeedbackModalRef.current?.onCommit(pageId ? { lessonId: pageId } : undefined);
        }}
      />
      <SuccessfulModal ref={successfulModalRef} />
      <BugFeedbackModal
        ref={bugFeedbackModalRef}
        onSubmitSuccess={() => {
          successfulModalRef.current?.open();
        }}
      />
    </div>
  );
};

export default forwardRef(ReportBugModal);
