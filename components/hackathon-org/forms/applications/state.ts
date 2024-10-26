import { create } from 'zustand';
import applications from '../../constants/applications.json';

type ApplicationState = Omit<(typeof applications.OnlineProfiles)[number], 'setOptional'> & {
  property: Record<string, any>;
  setOptional?: boolean;
};

type ApplicationStore = {
  aboutState: ApplicationState[];
  onlineProfileState: ApplicationState[];
  contactState: ApplicationState[];
  setAboutState: (payload: ApplicationState[]) => void;
  setOnlineProfileState: (payload: ApplicationState[]) => void;
  setContactState: (payload: ApplicationState[]) => void;
};
console.log(applications.OnlineProfiles);
export const useApplicationState = create<ApplicationStore>((set) => ({
  // @ts-expect-error
  aboutState: [...applications.About],
  onlineProfileState: [...applications.OnlineProfiles],
  contactState: [...applications.Contact],
  setAboutState: (payload) => set({ aboutState: payload }),
  setOnlineProfileState: (payload) => set({ onlineProfileState: payload }),
  setContactState: (payload) => set({ contactState: payload })
}));
