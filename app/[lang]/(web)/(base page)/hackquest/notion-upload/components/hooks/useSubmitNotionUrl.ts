import { getToken } from '@/helper/user-token';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useSubmitNotionUrl = () => {
  const router = useRouter();
  const [logs, setLogs] = useState({ status: 'default', message: '' });

  const onSubmit = useCallback(
    (notionUrl: string) => {
      const token = getToken();
      setLogs({ status: 'pending', message: '' });

      const eventSource = new EventSource(
        `${process.env.BACKEND_BASE_URL}/admin/parse-notion?token=${token}&notionUrl=${notionUrl}`
      );

      eventSource.addEventListener('message', (event) => {
        setLogs((l) => ({ status: 'pending', message: l.message + '\n' + event.data }));
        router.refresh();
      });

      eventSource.addEventListener('error', (event) => {
        // setLogs({ status: 'error', message: 'event' });
        router.refresh();
        eventSource.close();
      });
    },
    [router]
  );

  return {
    logs,
    onSubmit,
    setLogs
  };
};
