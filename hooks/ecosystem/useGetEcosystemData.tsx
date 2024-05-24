import webApi from '@/service';
import { ecosystemStore } from '@/store/zustand/ecosystemStore';
import { useShallow } from 'zustand/react/shallow';
export const useGetEcosystemData = () => {
  const { setEcosystem } = ecosystemStore(
    useShallow((state) => ({
      setEcosystem: state.setEcosystem
    }))
  );

  const getEcosystems = async () => {
    let res = await webApi.ecosystemApi.getEcosystems();
    setEcosystem(res);
    return res;
  };

  return { getEcosystems };
};
