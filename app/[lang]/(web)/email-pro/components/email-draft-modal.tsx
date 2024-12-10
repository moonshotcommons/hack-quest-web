import Button from '@/components/Common/Button';
import useEmailStore from '@/store/zustand/emailStore';
import { message, Modal } from 'antd';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

interface EmailDraftModalProps {
  draftHtml: string;
  draftJson: any;
}

const EmailDraftModal = (props: EmailDraftModalProps) => {
  const { draftHtml, draftJson } = props;
  const [open, setOpen] = useState(false);
  const { loadingDesign } = useEmailStore(
    useShallow((state) => ({
      loadingDesign: state.loadingDesign
    }))
  );

  return (
    <>
      <a
        key="preview"
        onClick={() => {
          setOpen(true);
        }}
      >
        preview
      </a>
      <Modal
        title="Preview"
        open={open}
        width={900}
        footer={
          <div className="flex justify-end gap-5 pt-5">
            <Button
              type="secondary"
              className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
              onClick={() => {
                setOpen(false);
              }}
            >
              cancel
            </Button>
            <Button
              type="primary"
              className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
              onClick={() => {
                loadingDesign && loadingDesign(draftJson);
                message.success('Application successful');
                setOpen(false);
              }}
            >
              Open
            </Button>
          </div>
        }
        onOk={() => {}}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <iframe width="100%" height="500px" srcDoc={draftHtml}></iframe>
      </Modal>
    </>
  );
};

export default EmailDraftModal;
