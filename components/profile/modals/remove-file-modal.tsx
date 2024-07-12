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

export const RemoveFile = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>
          <XIcon size={20} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-12">
        <div className="relative mx-auto h-[74px] w-[76px]">
          <Image src="/images/user/file.png" alt="file" fill />
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to remove the file?</AlertDialogTitle>
          <AlertDialogDescription>cameron_wang.pdf</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Delete</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
