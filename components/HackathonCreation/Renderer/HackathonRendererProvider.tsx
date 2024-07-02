import { getHackathonRegisterSteps } from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/register/components/constants';

import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { CustomComponentConfig, PresetComponentConfig, SubmissionSectionType } from '../type';
import { PresetComponentMap } from '..';
import { z } from 'zod';

import { getHackathonSubmissionSteps } from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/submission/[projectId]/components/constants';
import { ProjectSubmitStateType } from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/submission/[projectId]/type';
import { HackathonRegisterStateType } from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/register/type';

interface HackathonRenderProviderProps {
  children: ReactNode;
  simpleHackathonInfo: SimpleHackathonInfo;
  hackathonSteps: ReturnType<typeof getHackathonRegisterSteps | typeof getHackathonSubmissionSteps>;
  onNext: (state?: Partial<ProjectSubmitStateType | HackathonRegisterStateType | any>) => void;
  onBack: VoidFunction;
  prizeTracks: string[];
  handleType?: 'submission' | 'edit';
}

type HackathonRendererContextType = Omit<HackathonRenderProviderProps, 'children' | 'simpleHackathonInfo'> & {
  simpleHackathonInfo: SimpleHackathonInfo | null;
};

const HackathonRendererContext = createContext<HackathonRendererContextType>({
  simpleHackathonInfo: null,
  hackathonSteps: [],
  onNext: () => {},
  onBack: () => {},
  prizeTracks: [],
  handleType: 'submission'
});

export const HackathonRendererProvider: FC<HackathonRenderProviderProps> = ({
  children,
  handleType = 'submission',
  ...rest
}) => {
  return (
    <HackathonRendererContext.Provider value={{ ...rest, handleType }}>{children}</HackathonRendererContext.Provider>
  );
};

export const useHackathonConfig = (): HackathonRendererContextType => {
  const context = useContext(HackathonRendererContext);

  return context;
};

export const useValidatorFormSchema = (
  sectionConfig:
    | (PresetComponentConfig<{}, {}> | CustomComponentConfig)[]
    | { [Key in SubmissionSectionType]: (PresetComponentConfig<{}, {}> | CustomComponentConfig)[] },
  isFlat = false
) => {
  const formSchema = useMemo(() => {
    let schema = {};

    if (isFlat) {
      sectionConfig = Object.values(sectionConfig).reduce((prev, curr) => {
        return [...prev, ...curr];
      }, []);
    }

    (sectionConfig as (PresetComponentConfig<{}, {}> | CustomComponentConfig)[]).forEach((cfg) => {
      const fullConfig = PresetComponentMap[cfg.type];
      if (fullConfig) {
        const mergeConfig = { ...fullConfig, ...cfg };
        const validatorRecord = fullConfig.getValidator(mergeConfig as PresetComponentConfig);
        schema = { ...schema, ...validatorRecord };
      } else {
        let validator = z.string().min(cfg.optional ? 0 : 1);
        schema = { ...schema, [cfg.id]: cfg.optional ? validator.optional() : validator };
      }
    });

    return z.object(schema);
  }, []);

  return formSchema;
};
