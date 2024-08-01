import { routes } from '@app/constants';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { usePeopleStore } from '@app/store/people/store';
import { AddEmployeeForm } from '../AddEmployeeFormProvider';
import { addEmployeeFirstStepFields } from '../AddEmployeeFormProvider/AddEmployeeForm';

export const usePersonalDetails = () => {
  const form = useFormContext<AddEmployeeForm>();
  const [formValid, setFormValid] = useState(false);
  const updateProgress = usePeopleStore((state) => state.updateProgress);
  const { errors, touchedFields } = form.formState;
  const errorFields = Object.keys(errors);

  // INFO: Workaround to trigger use effect when touchedFields object changes - https://github.com/facebook/react/issues/14476
  const touchedFieldStringified = JSON.stringify(touchedFields);
  useEffect(() => {
    const touched = addEmployeeFirstStepFields.every((field) => touchedFields[field]);
    const firstStepError = addEmployeeFirstStepFields.some((firstStepField) => errorFields.includes(firstStepField));
    setFormValid(touched && !firstStepError);
  }, [touchedFields, touchedFieldStringified, errors, errorFields]);

  // INFO: update progress in sidebar stepper
  useEffect(() => {
    if (formValid) updateProgress({ [routes.people.addNew.personalDetails]: 'completed' });
    else updateProgress({ [routes.people.addNew.personalDetails]: 'inProgress' });
  }, [formValid, updateProgress]);

  return { formValid };
};
