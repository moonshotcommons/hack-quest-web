import { isMobile } from 'react-device-detect';

const useGetDevice = () => {
  return isMobile;
};

export default useGetDevice;
