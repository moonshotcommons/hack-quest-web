import { Metadata } from 'next';
import Instructor from '../components';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Instructor',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/instructor`
    }
  };
}

export default Instructor;
