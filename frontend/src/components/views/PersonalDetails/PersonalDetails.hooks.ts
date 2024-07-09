import { routes } from '@app/constants';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PersonalDetailsForm, PersonalDetailsFormNames } from './PersonalDetails.interface';
import { usePeopleStore } from '@app/store/people/store';

export const usePersonalDetails = () => {
  const form = useForm<PersonalDetailsForm>({
    mode: 'onChange',
    defaultValues: {
      [PersonalDetailsFormNames.firstName]: '',
      [PersonalDetailsFormNames.lastName]: '',
      [PersonalDetailsFormNames.email]: '',
    },
  });
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

  return { form, formValid };
};
