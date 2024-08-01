import { routes } from '@app/constants';
import { usePeopleStore } from '@app/store/people';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

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

  const handleSave = () => {
    toast.promise(
      new Promise((res) =>
        setTimeout(() => {
          res('fake fetch');
          handleBack();
        }, 2000),
      ),
      {
        loading: 'Saving...',
        success: <b>Employee saved!</b>,
        error: <b>Could not save.</b>,
      },
    );
  };

  return {
    cancelModalOpen,
    setCancelModalOpen,
    isDirty,
    handleBack,
    handleSave,
    formValid,
  };
};
