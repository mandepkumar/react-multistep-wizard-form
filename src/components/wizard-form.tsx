import React, { createContext, forwardRef, ReactNode, useState } from "react";

// Define the shape of the WizardContext
export interface WizardContext {
  totalWizardSteps: number;
  currWizardStep: number;
  isFirstWizardStep: boolean;
  isLastWizardStep: boolean;
  isWizardFormSubmitted: boolean;
  nextWizardStep: () => void;
  previousWizardStep: () => void;
  submitWizardForm: () => void;
}

// Create the WizardContext
export const WizardContext = createContext<WizardContext | undefined>(
  undefined
);

export interface WizardSectionContext {
  setTotalWizardSteps: React.Dispatch<React.SetStateAction<number>>;
  setWizardStep: React.Dispatch<React.SetStateAction<number>>;
  setIsWizardFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitWizardForm: () => void;
}

// Create the internal WizardContext for sharing the data to sections
export const WizardInternalContext = createContext<
  WizardSectionContext | undefined
>(undefined);

// Define the shape of the IWizardFormProps
export interface WizardFormProps {
  className?: string | undefined;
  children: ReactNode[];
  initialWizardStep?: number;
  onSubmitWizardForm: () => void;
}

const WizardForm = forwardRef<HTMLDivElement, WizardFormProps>(
  ({ className, children, initialWizardStep = 0, onSubmitWizardForm }, ref) => {
    const [totalWizardSteps, setTotalWizardSteps] = useState<number>(0);
    const [wizardStep, setWizardStep] = useState(initialWizardStep);
    const [isWizardFormSubmitted, setIsWizardFormSubmitted] = useState(false);

    const nextWizardStep = () => {
      if (wizardStep < totalWizardSteps - 1) setWizardStep((prev) => prev + 1);
    };
    const previousWizardStep = () => {
      if (wizardStep > 0) setWizardStep((prev) => prev - 1);
    };

    const submitWizardForm = () => {
      setIsWizardFormSubmitted(true);
    };

    const isFirstWizardStep = wizardStep == 0;
    const isLastWizardStep = wizardStep == totalWizardSteps - 1;

    return (
      <WizardContext.Provider
        value={{
          totalWizardSteps,
          currWizardStep: wizardStep,
          isFirstWizardStep,
          isLastWizardStep,
          isWizardFormSubmitted,
          nextWizardStep,
          previousWizardStep,
          submitWizardForm,
        }}
      >
        <WizardInternalContext.Provider
          value={{
            setTotalWizardSteps,
            setWizardStep,
            setIsWizardFormSubmitted,
            onSubmitWizardForm,
          }}
        >
          <div ref={ref} className={className}>
            {children}
          </div>
        </WizardInternalContext.Provider>
      </WizardContext.Provider>
    );
  }
);

WizardForm.displayName = "WizardForm";

export default WizardForm;
