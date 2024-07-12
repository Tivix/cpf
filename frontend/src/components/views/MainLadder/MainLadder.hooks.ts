import { useFieldArray, useForm } from 'react-hook-form';
import { MainLadderForm, MainLadderFormNames } from './MainLadder.interface';
import { useEffect, useState } from 'react';

export const useMainLadder = () => {
  const form = useForm<MainLadderForm>({
    mode: 'onChange',
    defaultValues: {
      [MainLadderFormNames.ladder]: {},
      [MainLadderFormNames.technology]: [],
    },
  });

  const technologyFields = useFieldArray({
    name: MainLadderFormNames.technology,
    control: form.control,
  });

  const [open, setOpen] = useState(true);
  const [selectLadderValid, setSelectLadderValid] = useState(false);

  const handleSubmit = form.handleSubmit((data) => console.log('data', data));
  const values = form.watch();
  const ladderSelected = values?.[MainLadderFormNames.ladder]?.name?.length > 0;

  useEffect(() => {
    const firstTechnology = values?.[MainLadderFormNames.technology]?.[0];
    const technologySelected = firstTechnology && firstTechnology.name?.length > 0;

    if (ladderSelected && technologySelected) {
      setSelectLadderValid(true);
    } else {
      setSelectLadderValid(false);
    }
  }, [values, ladderSelected]);

  return { form, handleSubmit, technologyFields, open, setOpen, ladderSelected, selectLadderValid };
};
