'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '../common/input';
import { EditIcon } from '@/components/ui/icons/edit';
import { TwitterIcon } from '@/components/ui/icons/twitter';
import { ShareIcon } from '@/components/ui/icons/share';

export function ShareProfile() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [username, setUsername] = React.useState('evan');
  const [error, setError] = React.useState('');

  function onSave() {
    if (!username) {
      setError('Please enter a username');
      return;
    }
    if (!username.match(/^[a-zA-Z0-9]{3,50}$/)) {
      setError('The URL is usually 3-50 letters or numbers without special characters like @, !, &');
      return;
    }

    setIsEditing(false);
    setError('');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="outline-none">
          <ShareIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[640px] max-w-[640px] gap-8 p-12">
        <DialogHeader className="shrink-0 text-left">
          <DialogTitle className="text-[22px]">Share Profile</DialogTitle>
        </DialogHeader>
        <div className="">
          <label className="text-neutral-rich-gray">Custom Profile URL</label>
          <div className="flex items-center">
            <p className="h-12 leading-[48px] text-neutral-off-black">www.hackquest.io/user/</p>
            {isEditing ? (
              <Input className="ml-1" value={username} onChange={(e) => setUsername(e.target.value)} />
            ) : (
              <div className="flex w-full items-center justify-between">
                <span>{username}</span>
                <button className="outline-none" onClick={() => setIsEditing(true)}>
                  <EditIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          {isEditing ? (
            <div className="mt-4 flex flex-col">
              {error ? (
                <p className="text-status-error-dark">{error}</p>
              ) : (
                <p className="text-neutral-medium-gray">The URL is usually 3-50 letters or numbers</p>
              )}
              <Button className="mt-8 w-[165px] self-end" onClick={onSave}>
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="mt-8 flex items-center gap-8">
              <Button variant="outline" className="w-[165px]">
                Copy Link
              </Button>
              <div className="flex items-center gap-6">
                <span>Or Share With</span>
                <TwitterIcon className="h-6 w-6" />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
