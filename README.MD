# MultiStep Wizard Form

react-multistep-wizard-form is a versatile React component that simplifies creating multi-step forms. It allows you to easily manage complex forms with multiple sections and dynamic navigation.

## Demo

You can see a live demo of the component [here](https://react-multistep-wizard-form.vercel.app/).

![](https://github.com/mandepkumar/react-multistep-wizard-form/blob/main/src/assets/demo.gif)

## Installation

To install the package, use npm or yarn:

```bash
npm install react-multistep-wizard-form
```

or

```bash
yarn add react-multistep-wizard-form
```

## Usage

Import Components
You can import the following components and hooks from the package:

```javascript
import {
  WizardForm,
  WizardSections,
  useWizardForm,
} from "react-multistep-wizard-form";
```

### Basic Usage

Wrap your form sections with WizardForm and WizardSections. Pass the onSubmitWizardForm function to WizardForm to handle form submission.

```javascript
<WizardForm onSubmitWizardForm={() => setFormSubmitted(true)}>
  <WizardSections>
    <NameSection />
    <ContactSection />
    {showAddressSection && <AddressSection />}
  </WizardSections>
</WizardForm>
```

Custom Navigation
You can create a custom navigation indicator using the useWizardForm hook:

```javascript
const CustomNav = () => {
  const { totalWizardSteps, currWizardStep } = useWizardForm();

  if (totalWizardSteps <= 1) return null;

  const getClass = (idx: number) =>
    idx === currWizardStep
      ? "CurrentSection"
      : idx < currWizardStep
      ? "section-completed"
      : "Section-not-completed";

  return (
    <div className="CustomNav">
      {Array.from({ length: totalWizardSteps }).map((_, idx) => (
        <div className="CustomNavGroup" key={"CustomNav-" + idx}>
          <div className={`Circle ${getClass(idx)}`}>{idx + 1}</div>
          {idx + 1 !== totalWizardSteps && <div className="Bar"></div>}
        </div>
      ))}
    </div>
  );
};
```

Use the custom navigation in your WizardForm:

```javascript
<WizardForm onSubmitWizardForm={() => setFormSubmitted(true)}>
  <CustomNav />
  <WizardSections>
    <NameSection />
    <ContactSection />
  </WizardSections>
</WizardForm>
```

## Hooks

The useWizardForm hook provides the following functionalities:

1. totalWizardSteps: Returns the total number of steps in the wizard form. This is useful for rendering progress indicators or navigation elements.

2. currWizardStep: Returns the index of the current step being displayed. This can be used to highlight the current step or manage conditional rendering.

3. isFirstWizardStep: A boolean value that indicates whether the current step is the first step. This can be used to conditionally disable or hide the "Previous" button.

4. isLastWizardStep: A boolean value that indicates whether the current step is the last step. This can be used to conditionally disable or hide the "Next" button or display a submit button.

5. isWizardFormSubmitted: A boolean value that indicates whether the wizard form has been submitted. This value becomes true when the form is successfully submitted, either through user action or programmatic submission.

6. nextWizardStep: A function to move to the next step in the wizard. This function should be called when the user clicks a "Next" button or when you programmatically want to advance to the next step.

7. previousWizardStep: A function to move to the previous step in the wizard. This function should be called when the user clicks a "Previous" button or when you programmatically want to go back to the previous step.

8. submitWizardForm: A function that triggers the form submission process programmatically. This function can be used to submit the form and invoke the onSubmitWizardForm callback.

# Contributing

We welcome contributions to this project! If you would like to contribute, please visit our [GitHub repository](https://github.com/mandepkumar/react-multistep-wizard-form) for more information on how to get started.

# License

This project is licensed under the MIT License. See the LICENSE file for details.
