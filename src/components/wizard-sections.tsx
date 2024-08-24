import { ReactNode, useEffect } from "react";
import { useWizardForm } from "../hooks/useWizardForm";
import { useWizardInternal } from "../hooks/useWizardInternal";

interface WizardSectionsProps {
  children: ReactNode[];
}

const WizardSections = ({ children }: WizardSectionsProps) => {
  children = children.filter((child) => !!child);

  const { setTotalWizardSteps, onSubmitWizardForm } = useWizardInternal();

  const totalWizardSections = children ? children.length : 0;
  useEffect(() => {
    setTotalWizardSteps(totalWizardSections);
  }, [setTotalWizardSteps, totalWizardSections]);

  const { currWizardStep, isLastWizardStep, isWizardFormSubmitted } =
    useWizardForm();

  useEffect(() => {
    if (isLastWizardStep && isWizardFormSubmitted) {
      if (onSubmitWizardForm) onSubmitWizardForm();
    }
  }, [isLastWizardStep, isWizardFormSubmitted, onSubmitWizardForm]);
  return <>{children[currWizardStep]}</>;
};

WizardSections.displayName = "WizardSections";
export default WizardSections;
