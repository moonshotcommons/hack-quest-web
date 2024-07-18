'use client';

import Image from 'next/image';
import { XIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export const RemoveFile = ({ loading, name, onConfirm }: { loading: boolean; name: string; onConfirm: () => void }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="outline-none" onClick={(e) => e.stopPropagation()}>
          <XIcon size={20} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-12">
        <div className="relative mx-auto h-[74px] w-[76px]">
          <Image src="/images/user/file.png" alt="file" fill />
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to remove the file?</AlertDialogTitle>
          <AlertDialogDescription>{name}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onConfirm();
              }}
              isLoading={loading}
            >
              Delete
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
