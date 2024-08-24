import { useContext } from "react";
import { WizardContext } from "../components/wizard-form";

// Create a custom hook for accessing the context
export const useWizardForm = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardFrom");
  }
  return context;
};
