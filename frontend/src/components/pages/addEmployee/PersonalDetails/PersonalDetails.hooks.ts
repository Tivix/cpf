import { routes } from '@app/constants';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { usePeopleStore } from '@app/store/people/store';
import { AddEmployeeForm } from '../AddEmployeeFormProvider';

export const usePersonalDetails = () => {
  const form = useFormContext<AddEmployeeForm>();
  const { isDirty, isValid } = form.formState;
  const [formValid, setFormValid] = useState(false);
  const updateProgress = usePeopleStore((state) => state.updateProgress);

  useEffect(() => {
    setFormValid(isDirty && isValid);
  }, [isDirty, isValid]);

  // INFO: update progress in sidebar stepper
  useEffect(() => {
    if (formValid) updateProgress({ [routes.people.addNew.personalDetails]: 'completed' });
    else updateProgress({ [routes.people.addNew.personalDetails]: 'inProgress' });
  }, [formValid, updateProgress]);

  return { formValid };
};
