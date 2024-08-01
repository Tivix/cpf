import { useFieldArray, useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { AddEmployeeForm, addEmployeeFormNames } from '../AddEmployeeFormProvider';
import { usePeopleStore } from '@app/store/people';
import { routes } from '@app/constants';

export const useMainLadder = () => {
  const form = useFormContext<AddEmployeeForm>();
  const updateProgress = usePeopleStore((state) => state.updateProgress);
  const technologyFields = useFieldArray({
    name: addEmployeeFormNames.technology,
    control: form.control,
  });
  const [open, setOpen] = useState(true);
  const [formValid, setFormValid] = useState(false);
  const [stepValid, setStepValid] = useState(false);

  const handleSubmit = form.handleSubmit((data) => console.log('data', data));
  const values = form.watch();
  const ladderSelected = values?.[addEmployeeFormNames.ladder]?.name?.length > 0;
  const firstTechnology = values?.[addEmployeeFormNames.technology]?.[0];

  useEffect(() => {
    const technologySelected = firstTechnology && firstTechnology.name?.length > 0;
    const stepValid = ladderSelected && technologySelected;

    setStepValid(stepValid);
    setFormValid(stepValid && form.formState.isValid);
  }, [values, ladderSelected, firstTechnology, form.formState]);

  // INFO: update progress in sidebar stepper
  useEffect(() => {
    if (stepValid) updateProgress({ [routes.people.addNew.mainLadder]: 'completed' });
    else updateProgress({ [routes.people.addNew.mainLadder]: 'inProgress' });
  }, [stepValid, updateProgress]);

  return { firstTechnology, handleSubmit, technologyFields, open, setOpen, ladderSelected, formValid };
};
