'use client'; // Error components must be Client Components

import { errorMessage } from '@/helper/ui';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service 111
    errorMessage(error);
  }, [error]);

  // return (
  // <div className="text-white">
  //   <h2>{error.message}!</h2>
  //   <button
  //     onClick={
  //       // Attempt to recover by trying to re-render the segment
  //       () => reset()
  //     }
  //   >
  //     Try again
  //   </button>
  // </div>

  // );
  return null;
}
