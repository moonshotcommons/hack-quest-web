import React from 'react';
import Head from 'next/head';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  console.info(title, 'title');
  return (
    <Head>
      <title>{title ? title + ' | HackQuest' : 'HackQuest'}</title>
    </Head>
  );
};

export default Title;
