import { routes } from '@app/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const useEmployeeTopbar = () => {
  const form = useFormContext();
  const router = useRouter();
  const { isDirty } = form.formState;
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const handleBack = () => router.push(routes.people.index);

  return {
    cancelModalOpen,
    setCancelModalOpen,
    isDirty,
    handleBack,
  };
};
