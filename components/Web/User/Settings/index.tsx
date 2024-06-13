import Modal from '@/components/Common/Modal';
import { FC, useEffect, useState } from 'react';
import { useUserStore } from '@/store/zustand/userStore';
import { FiX } from 'react-icons/fi';
import ChangePassword from './components/ChangePassword';
import ChangeSuccess from './components/ChangeSuccess';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface SettingsProps {
  // children: ReactNode;
}

const Settings: FC<SettingsProps> = (props) => {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.AUTH);
  const settingsOpen = useUserStore((state) => state.settingsOpen);
  const setSettingsOpen = useUserStore((state) => state.setSettingsOpen);
  const [changeSeccessVisible, setChangeSuccessVisible] = useState(false);
  const onClose = () => {
    setSettingsOpen(false);
  };

  useEffect(() => {
    if (settingsOpen) {
      setChangeSuccessVisible(false);
    }
  }, [settingsOpen]);

  return (
    <div>
      <Modal open={settingsOpen} onClose={onClose} icon={<FiX size={26} />} showCloseIcon={true}>
        <div className="body-l relative z-[99] w-[800px] rounded-[10px] bg-neutral-white p-[30px] text-neutral-medium-gray shadow-[0_4px_8px_0_rgba(0,0,0,0.12)]">
          <div className="text-h3 mb-[30px] text-neutral-black">{t('change_password')}</div>
          {!changeSeccessVisible && (
            <ChangePassword
              onClose={() => setSettingsOpen(false)}
              setChangeSuccessVisible={() => {
                setChangeSuccessVisible(true);
              }}
            />
          )}

          <ChangeSuccess onClose={() => setSettingsOpen(false)} show={changeSeccessVisible} />
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
