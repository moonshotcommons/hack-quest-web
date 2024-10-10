import { CustomSlateElement } from '@/app/[lang]/(web)/(base page)/(other)/hackquest/email/components/email-render';
import { create } from 'zustand';

export interface emailStoreProps {
  contentObj: CustomSlateElement[];
  setContentObj: (obj: CustomSlateElement[]) => void;
}

const useEmailStore = create<emailStoreProps>((set) => ({
  contentObj: [],
  setContentObj: (obj) =>
    set((state) => ({
      contentObj: obj
    }))
}));

export default useEmailStore;
