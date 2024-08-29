'use client';
import { FC, PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormProvider } from '@app/components/common/FormProvider';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { routes } from '@app/constants';
import { usePeopleStore } from '@app/store/people';
import { AddProjectForm, addProjectFormNames } from './AddProjectFormProvider.interface';

export const AddProjectFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const resetPeopleState = usePeopleStore((state) => state.reset);
  const form = useForm<AddProjectForm>({
    mode: 'onChange',
    defaultValues: {
      [addProjectFormNames.title]: '',
      [addProjectFormNames.type]: {},
      [addProjectFormNames.details]: '',
    },
    // resolver: zodResolver(addEmployeeFormSchema),
  });

  const handleSubmit = async (data: AddProjectForm) => {
    console.log('data', data);

    router.push(routes.mySpace.index);
    toast.success('Project created!');
    form.reset();
    resetPeopleState();
  };

  return (
    <FormProvider<AddProjectForm> onSubmit={handleSubmit} form={form}>
      {children}
    </FormProvider>
  );
};