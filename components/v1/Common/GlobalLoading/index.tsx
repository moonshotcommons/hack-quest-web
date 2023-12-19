import { FC } from 'react';
import Modal from '../Modal';

interface GlobalLoadingProps {}

const GlobalLoading: FC<GlobalLoadingProps> = (props) => {
  return (
    <Modal open={true} onClose={() => {}}>
      <div>loading...</div>
    </Modal>
  );
};

export default GlobalLoading;
