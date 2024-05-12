import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import Title from '../Title';
import Link from 'next/link';

interface EnrollmentProp {}

const Enrollment: React.FC<EnrollmentProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <div>
      <div className="mb-[32px]">
        <Title title={t(titleTxtData[2])} />
      </div>
      <div className="body-m flex flex-col gap-[20px] text-neutral-rich-gray">
        {/* <p className="">{t('ntuCourse.enrollment.text1')}</p>
        <p className="">{t('ntuCourse.enrollment.text2')}</p>
        <p className="">{t('ntuCourse.enrollment.text3')}</p>
        <p className="">{t('ntuCourse.enrollment.text4')}</p> */}
        <div>
          <p className="body-l-bold">The HackQuest x NTU I&E MOOC</p>
          <div className="mt-2 flex flex-col gap-5">
            <p>
              The HackQuest x NTU I&E MOOC is free and open to all individuals interested in Web3. The MOOC is designed
              to be universally accessible, featuring an online educational model that includes one to two-hour weekly
              sessions, both on- and off-campus. This approach ensures accessibility for an international audience and
              allows participants to review the content at their convenience.
            </p>
            <p>
              You don’t have to be an enrolled NTU student to access the course materials and synchronous sessions and
              be eligible for proof of completion. However, to attend the sessions in person on the NTU campus, you have
              to be currently enrolled at NTU.
            </p>
            <p>
              This MOOC is also designed to prepare students in Singapore for the Port63 Challenge Web3 Track that will
              take place shortly after the end of the MOOC.
            </p>
          </div>
        </div>
        <div>
          <p className="body-l-bold">Beyond MOOC: The Port63 Challenge</p>
          <div className="mt-2 flex flex-col gap-5">
            <p>
              {`The Port63 Challenge, a proud flagship of NTU I&E, is a unique initiative that goes beyond the
              conventional educational approach, allowing participants to apply their knowledge, gain fresh
              perspectives, and analyse real-world challenges. The second edition is set to commence in August 2024,
              with completion of the MOOC as a prerequisite in the Web 3.0 Track. Teams comprising members from
              Singapore's Institutes of Higher Learning and Polytechnics, along with a mandatory NTU-affiliated member,
              are strongly encouraged to participate. This competition offers cash prizes, funding, and mentorship to
              support the realisation of innovative ideas. Stay tuned for more details!`}
            </p>
            <p>
              To read on the inaugural run, please visit 
              <Link
                href={'https://www.ntu.edu.sg/innovates/port63'}
                className="cursor-pointer text-neutral-medium-gray underline"
              >
                https://www.ntu.edu.sg/innovates/port63
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;
