import { routes } from '@app/constants';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { usePeopleStore } from '@app/store/people/store';
import { addEmployeeFirstStepFields, AddEmployeeForm } from '../AddEmployeeFormProvider';

export const usePersonalDetails = () => {
  const form = useFormContext<AddEmployeeForm>();
  const [formValid, setFormValid] = useState(false);
  const updateProgress = usePeopleStore((state) => state.updateProgress);
  const { errors, dirtyFields } = form.formState;
  const errorFields = Object.keys(errors);

  // INFO: Workaround to trigger use effect when touchedFields object changes - https://github.com/facebook/react/issues/14476
  const dirtyFieldsStringified = JSON.stringify(dirtyFields);
  useEffect(() => {
    const touched = addEmployeeFirstStepFields.every((field) => dirtyFields[field]);
    const firstStepError = addEmployeeFirstStepFields.some((firstStepField) => errorFields.includes(firstStepField));
    setFormValid(touched && !firstStepError);
  }, [dirtyFields, dirtyFieldsStringified, errors, errorFields]);

  // INFO: update progress in sidebar stepper
  useEffect(() => {
    if (formValid) updateProgress({ [routes.people.addNew.personalDetails]: formValid ? 'completed' : 'inProgress' });
  }, [formValid, updateProgress]);

  return { formValid };
};
