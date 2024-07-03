import { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import MenuLink from '@/constants/MenuLink';
import { useRedirect } from '@/hooks/router/useRedirect';
import emitter from '@/store/emitter';
import { useEffect, useRef } from 'react';

export const useFormExit = (exitAction: () => Promise<any>) => {
  const exitConfirmRef = useRef<ConfirmModalRef>(null);
  const { redirectToUrl } = useRedirect();

  useEffect(() => {
    const exit = () => {
      exitConfirmRef.current?.open({
        onConfirm: exitAction,
        onConfirmCallback: () => redirectToUrl(`${MenuLink.HACKATHON_DASHBOARD}`)
      });
    };

    emitter.on('submit-form-exit', exit);
    return () => {
      emitter.off('submit-form-exit', exit);
    };
  }, []);
  return exitConfirmRef;
};
