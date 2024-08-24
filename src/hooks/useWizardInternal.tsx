import { useContext } from "react";
import {
  WizardInternalContext,
  WizardSectionContext,
} from "../components/wizard-form";

export const useWizardInternal = (): WizardSectionContext => {
  const context = useContext(WizardInternalContext);
  if (!context) {
    throw new Error(
      "useWizardInternal must be used within a WizardInternalProvider"
    );
  }
  return context;
};
