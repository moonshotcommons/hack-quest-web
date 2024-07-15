import { HackathonAuditType } from './type';
import { GrLineChart } from 'react-icons/gr';
import { LiaUserEditSolid } from 'react-icons/lia';
import { MdAppRegistration, MdOutlineEngineering } from 'react-icons/md';

export const hackathonAuditNavData = [
  {
    id: HackathonAuditType.OVERVIEW,
    label: 'hackathonAudit.overview',
    icon: <GrLineChart size={20} />
  },
  {
    id: HackathonAuditType.APPLICATION,
    label: 'hackathonAudit.application',
    icon: <LiaUserEditSolid size={20} />
  },
  {
    id: HackathonAuditType.SUBMISSION,
    label: 'hackathonAudit.submission',
    icon: <MdAppRegistration size={20} />
  },
  {
    id: HackathonAuditType.ADMIN,
    label: 'hackathonAudit.admin',
    icon: <MdOutlineEngineering size={20} />
  }
];
