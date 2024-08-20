import { routes } from '@app/constants';
import { usePeopleStore } from '@app/store/people';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const useEmployeeTopbar = () => {
  const form = useFormContext();
  const router = useRouter();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const resetPeopleState = usePeopleStore((state) => state.reset);

  const { isDirty, isValid } = form.formState;

  const handleBack = () => {
    router.push(routes.people.index);
    form.reset();
    resetPeopleState();
  };

  const formValid = isDirty && isValid;

  return {
    cancelModalOpen,
    setCancelModalOpen,
    isDirty,
    handleBack,
    formValid,
    isSubmitting: form.formState.isSubmitting,
  };
};
