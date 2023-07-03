import { NextPage } from 'next';

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: NextPage<DashboardProps> = (props) => {
  return <h1 className="text-white">Dashboard</h1>;
};

export default Dashboard;
