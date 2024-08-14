import { useFieldArray, useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { AddEmployeeForm, addEmployeeFormNames } from '../AddEmployeeFormProvider';
import { usePeopleStore } from '@app/store/people';
import { routes } from '@app/constants';
import { MainLadderProps } from './MainLadder.interface';
import { Option } from '@app/types/common';
import { mapKeysToOptions } from '@app/utils';

export const useMainLadder = (data: MainLadderProps['data']) => {
  const form = useFormContext<AddEmployeeForm>();
  const values = form.watch();
  const handleSubmit = form.handleSubmit((data) => console.log('data', data));
  const updateProgress = usePeopleStore((state) => state.updateProgress);
  const selectedLadder = values?.[addEmployeeFormNames.ladder].id;
  const firstTechnology = values?.[addEmployeeFormNames.technology]?.[0];
  const technologyFields = useFieldArray({
    name: addEmployeeFormNames.technology,
    control: form.control,
  });
  const { replace } = technologyFields;
  const [open, setOpen] = useState(true);
  const [formValid, setFormValid] = useState(false);
  const [stepValid, setStepValid] = useState(false);
  const [ladders, setLadders] = useState<Option[] | null>(null);
  const [technologies, setTechnologies] = useState<Option[] | null>(null);

  useEffect(() => {
    const ladderOptions = mapKeysToOptions(Object.keys(data));
    setLadders(ladderOptions);
  }, [data]);

  useEffect(() => {
    const ladderTechnologies = data[selectedLadder];
    setTechnologies(null);
    replace([]);
    if (selectedLadder && ladderTechnologies) {
      const technologyOptions = mapKeysToOptions(ladderTechnologies);
      setTechnologies(technologyOptions);
    }
  }, [selectedLadder, data, replace]);

  useEffect(() => {
    const technologySelected = firstTechnology && firstTechnology.name?.length > 0;
    const stepValid = selectedLadder && technologySelected;

    setStepValid(!!stepValid);
    setFormValid(!!stepValid && form.formState.isValid);
  }, [values, selectedLadder, firstTechnology, form.formState]);

  // INFO: update progress in sidebar stepper
  useEffect(() => {
    if (stepValid) updateProgress({ [routes.people.addNew.mainLadder]: 'completed' });
    else updateProgress({ [routes.people.addNew.mainLadder]: 'inProgress' });
  }, [stepValid, updateProgress]);

  return {
    ladders,
    technologies,
    firstTechnology,
    form,
    handleSubmit,
    technologyFields,
    open,
    setOpen,
    selectedLadder,
    formValid,
  };
};
