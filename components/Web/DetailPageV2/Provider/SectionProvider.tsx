import { SectionType } from '@/service/webApi/learningTrack/type';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { LearningTrackDetailContext } from './LearningTrackDetailProvider';

interface SectionProviderProps {
  children: ReactNode;
  section: SectionType;
  sectionIndex: number;
}

interface SectionContextType {
  section: SectionType | null;
  sectionIndex: number;
}

export const SectionContext = createContext<SectionContextType>({
  section: null,
  sectionIndex: 0
});

const SectionProvider: FC<SectionProviderProps> = ({
  section: propSection,
  children,
  sectionIndex
}) => {
  const { learningTrackDetail } = useContext(LearningTrackDetailContext);

  const section = useMemo(() => {
    const sections = learningTrackDetail?.sections;
    if (sections?.length) {
      return sections.find((s, index) => index === sectionIndex) || propSection;
    }
    return propSection;
  }, [propSection, learningTrackDetail, sectionIndex]);

  return (
    <SectionContext.Provider
      value={{
        section,
        sectionIndex
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export default SectionProvider;
