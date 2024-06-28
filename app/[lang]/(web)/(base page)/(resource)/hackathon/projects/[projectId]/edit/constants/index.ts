import { HackathonPartner } from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/submission/[projectId]/components/constants';

export const fullSectionData = ['Info', 'Project', 'Videos', 'Links', 'Others', 'Wallet'];

export const getSectionData = (hackathonId: string) => {
  switch (hackathonId) {
    case HackathonPartner.Linea:
      return fullSectionData;
    case HackathonPartner.Hack4Bengal:
      return ['Info', 'Videos', 'Others'];
    default:
      return fullSectionData.filter((item) => !['Project', 'Links'].includes(item));
  }
};
