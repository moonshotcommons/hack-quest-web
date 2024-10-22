import dayjs from '@/components/Common/Dayjs';
import webApi from '@/service';
import { EmailDraftVo } from '@/service/webApi/email/type';
import { Drawer, List, message, Modal } from 'antd';
import { useState } from 'react';
import EmailDraftModal from './email-draft-modal';
import Button from '@/components/Common/Button';

const EmailDraftDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draftList, setDraftList] = useState<EmailDraftVo[]>([]);

  const getEmailDraft = () => {
    webApi.emailApi.getEmailDraft().then((res) => {
      console.log(res);
      setDraftList(res.data);
    });
  };

  const deleteEmailDraft = (id: string) => {
    message.loading({
      content: 'deleting...',
      duration: 0,
      key: 'delete-email-draft'
    });
    webApi.emailApi
      .deleteEmailDraft(id)
      .then((res) => {
        if (res.id) {
          message.success('delete successfully');
          getEmailDraft();
        }
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        message.destroy('delete-email-draft');
      });
  };

  const openEmailDraft = (id: string) => {
    Modal.warning({
      title: 'Waring',
      content: 'Are you sure delete this email draft!!!',
      footer: () => (
        <div className="flex justify-end gap-5 pt-5">
          <Button
            type="secondary"
            className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
            onClick={() => {
              Modal.destroyAll();
            }}
          >
            cancel
          </Button>
          <Button
            type="primary"
            className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
            onClick={() => {
              deleteEmailDraft(id);
              Modal.destroyAll();
            }}
          >
            confirm
          </Button>
        </div>
      )
    });
  };

  return (
    <>
      <div
        className="cursor-pointer font-semibold"
        onClick={() => {
          setDrawerOpen(true);
          getEmailDraft();
        }}
      >
        <span>Draft</span>
      </div>
      <Drawer
        size="large"
        title="Draft"
        onClose={() => {
          setDrawerOpen(false);
        }}
        open={drawerOpen}
      >
        <List
          itemLayout="horizontal"
          dataSource={draftList}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <EmailDraftModal key="preview" draftJson={item.draftJson} draftHtml={item.draftHtml} />,
                <a
                  key="delete"
                  onClick={() => {
                    openEmailDraft(item.id);
                  }}
                >
                  delete
                </a>
              ]}
            >
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
                description={`created Time: ${dayjs(item.createdAt).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm:ss')}`}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default EmailDraftDrawer;
