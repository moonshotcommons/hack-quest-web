import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import Modal from '@/components/Common/Modal';
import { HACKQUEST_DISCORD } from '@/constants/links';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { HiArrowLongRight } from 'react-icons/hi2';

interface SubmitWordModalProp {
  open: boolean;
  onClose: VoidFunction;
}

const SubmitWordModal: React.FC<SubmitWordModalProp> = ({ open, onClose }) => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const onSubmit = () => {
    if (!keyword || loading) return;
    setIsSuccess(true);
  };
  useEffect(() => {
    if (open) {
      setKeyword('');
      setIsSuccess(false);
    }
  }, [open]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon
      icon={<FiX size={30} />}
      iconClassName="right-[16px] top-[16px]"
    >
      <div className="flex w-[670px] flex-col items-center gap-[20px] rounded-[16px] bg-neutral-white px-[40px] py-[48px]">
        {!isSuccess ? (
          <>
            <p className="text-h3 text-neutral-black">
              Submit A Word You Want To Know
            </p>
            <div className="w-full">
              <Input
                label={
                  <span className="body-l text-neutral-medium-gray">
                    This is a required question*
                  </span>
                }
                name=""
                placeholder="Any words about Web3 are welcome..."
                className="border-neutral-medium-gray"
                maxLength={60}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div className="body-l mt-[10px] flex w-full justify-end text-neutral-medium-gray">
                {`${keyword.length}/60`}
              </div>
            </div>
            <Button
              loading={loading}
              className={`button-text-m h-[48px] w-[256px] uppercase ${keyword ? 'bg-yellow-primary text-neutral-black' : 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray'}`}
              onClick={onSubmit}
            >
              submit
            </Button>
          </>
        ) : (
          <>
            <p className="text-h3 text-neutral-black">
              Submitted Successfully! 🎉
            </p>
            <p className="body-s text-neutral-black">
              Thank you for your word submission! Our team will review it, and
              if approved, it will be added to our Glossary shortly. Stay tuned
              for updates, and keep exploring the world of Web3 with us!
            </p>
            <Button
              ghost
              onClick={onClose}
              className="button-text-m h-[48px] w-[256px] border-neutral-black uppercase"
            >
              Close
            </Button>
          </>
        )}
        <div className="caption-14pt flex cursor-pointer justify-center gap-[16px] pt-[16px] text-neutral-black">
          <span>Hear followup?</span>
          <Link
            href={HACKQUEST_DISCORD}
            target="_blank"
            className="flex items-center gap-[6px]"
          >
            <span>Join Discord</span>
            <HiArrowLongRight size={20}></HiArrowLongRight>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default SubmitWordModal;
