import { ProfileProvider } from '@/components/job-station/components/profile-provider';

export default function UserProfileLayout({ children }: { children: React.ReactNode }) {
  return <ProfileProvider>{children}</ProfileProvider>;
}
