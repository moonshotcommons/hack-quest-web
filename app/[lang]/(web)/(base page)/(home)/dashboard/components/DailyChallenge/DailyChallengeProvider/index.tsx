import { FC, ReactNode, createContext, useContext } from 'react';
import { ButtonState } from '../DailyChallengeModal';

interface DailyChallengeProviderProps {
  children: ReactNode;
  buttonState: ButtonState;
  updateButtonState: (state: Partial<ButtonState>) => void;
  end: boolean;
  onChallengePass: VoidFunction;
}

const DailyChallengeContext = createContext<Omit<DailyChallengeProviderProps, 'children'>>({
  buttonState: {
    type: 'submit',
    disable: false
  },
  end: false,
  onChallengePass: () => {},
  updateButtonState: () => {}
});

const DailyChallengeProvider: FC<DailyChallengeProviderProps> = ({
  children,
  onChallengePass,
  buttonState,
  end,
  updateButtonState
}) => {
  return (
    <DailyChallengeContext.Provider
      value={{
        buttonState,
        updateButtonState,
        end,
        onChallengePass
      }}
    >
      {children}
    </DailyChallengeContext.Provider>
  );
};

export const useDailyChallengeContext = () => {
  return useContext(DailyChallengeContext);
};

export default DailyChallengeProvider;
