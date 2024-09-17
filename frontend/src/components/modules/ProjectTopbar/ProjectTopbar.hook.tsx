import { AddProjectForm } from '@app/components/pages/mySpace/addProject/AddProjectFormProvider/AddProjectFormProvider.interface';

import { routes } from '@app/constants';
import { useMySpaceStore } from '@app/store/mySpace';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useProjectTopbar = () => {
  const form = useFormContext<AddProjectForm>();
  const router = useRouter();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const resetMySpaceState = useMySpaceStore((state) => state.reset);
  const { isValid, isDirty } = form.formState;
  const handleBack = () => {
    router.push(routes.mySpace.index);
    form.reset();
    resetMySpaceState();
  };
  const handleSaveAsDraft = async () => {
    const values = form.getValues();
    console.log('values', values);

    const error = false;
    if (error) {
      toast.error(error);
      return;
    }
    router.push(routes.mySpace.index);
    toast.success('Project saved sa draft!');
    form.reset();
    resetMySpaceState();
  };
  return {
    cancelModalOpen,
    setCancelModalOpen,
    handleBack,
    formValid: isValid,
    isSubmitting: form.formState.isSubmitting,
    handleSaveAsDraft,
    isDirty,
  };
};
