import webApi from '@/service';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface DocsPageProps {}

const DocsPage: FC<DocsPageProps> = async (props) => {
  const docs = await webApi.helperApi.getDocs();

  const target = docs[0].children[0].children[0].alias;
  redirect(`/docs/${target}`);
  // return <>DocsPage</>;
};

export default DocsPage;
