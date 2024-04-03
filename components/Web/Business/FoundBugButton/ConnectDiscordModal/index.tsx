import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Modal from '@/components/Common/Modal';
import Button from '@/components/Common/Button';
import { message } from 'antd';
import webApi from '@/service';
import { useRequest } from 'ahooks';

interface ConnectDiscordModalProps {
  onConnectSuccess: () => void;
  onConnectLater: () => void;
}

export interface ConnectDiscordModalRef {
  open: () => void;
}

const ConnectDiscordModal = forwardRef<ConnectDiscordModalRef, ConnectDiscordModalProps>(
  ({ onConnectLater, onConnectSuccess }, ref) => {
    const [open, setOpen] = useState(false);
    useImperativeHandle(ref, () => {
      return {
        open() {
          setOpen(true);
        }
      };
    });

    const { run: connectMedia, loading: connectLoading } = useRequest(
      async () => {
        const res = await webApi.userApi.getConnectUrlByDiscord();
        window.open(res.url, '_blank', 'width=500,height=500,toolbar=no,menubar=no,location=no,status=no');
        return res;
      },
      {
        manual: true
      }
    );

    useEffect(() => {
      const refreshLinks = (e: StorageEvent) => {
        if (e.key === 'linkDiscord') {
          message.success('Connect Discord success!');
          setOpen(false);
          onConnectSuccess();
        }
      };
      window.addEventListener('storage', refreshLinks);
      return () => {
        window.removeEventListener('storage', refreshLinks);
        window.localStorage.removeItem('linkDiscord');
      };
    }, []);

    return (
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        showCloseIcon
        icon={
          <div className="absolute -right-[16px] -top-[16px] cursor-pointer">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="22.2734" y1="22.2745" x2="7.42416" y2="7.42521" stroke="#0B0B0B" />
              <line x1="7.42574" y1="22.2744" x2="22.275" y2="7.42513" stroke="#0B0B0B" />
            </svg>
          </div>
        }
        markBg="black"
      >
        <div className="flex w-[1084px] max-w-[1084px] flex-col items-center gap-10 rounded-[10px] bg-neutral-white px-[139px] py-20">
          <h3 className="text-h3 text-neutral-black">Connect with Discord</h3>
          <p className="body-m text-neutral-black">Connect with Discord to track & get reward!</p>
          <div className="flex gap-4">
            <Button
              type="primary"
              loading={connectLoading}
              className="button-text-m w-[223px] px-0 py-4 uppercase text-neutral-black"
              onClick={connectMedia}
            >
              connect with discord
            </Button>
            <Button
              ghost
              className="button-text-m w-[223px] px-0 py-4 uppercase text-neutral-black"
              onClick={() => {
                setOpen(false);
                onConnectLater();
              }}
            >
              connect later
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

export default ConnectDiscordModal;

ConnectDiscordModal.displayName = 'ConnectDiscordModal';
