import Modal from '@/components/Common/Modal';
import { FC, useEffect, useState } from 'react';
import { useUserStore } from '@/store/zustand/userStore';
import { FiX } from 'react-icons/fi';
import ChangePassword from './components/ChangePassword';
import ChangeSuccess from './components/ChangeSuccess';

interface SettingsProps {
  // children: ReactNode;
}

const Settings: FC<SettingsProps> = (props) => {
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
      <Modal
        open={settingsOpen}
        onClose={onClose}
        icon={<FiX size={26} />}
        showCloseIcon={true}
      >
        <div className="relative w-[800px] p-[30px] rounded-[10px] body-l text-neutral-medium-gray bg-neutral-white shadow-[0_4px_8px_0_rgba(0,0,0,0.12)] z-[99]">
          <div className="text-h3 text-[#000] mb-[30px]">Change Password</div>
          {!changeSeccessVisible && (
            <ChangePassword
              onClose={() => setSettingsOpen(false)}
              setChangeSuccessVisible={() => {
                setChangeSuccessVisible(true);
              }}
            />
          )}

          <ChangeSuccess
            onClose={() => setSettingsOpen(false)}
            show={changeSeccessVisible}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
