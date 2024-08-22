'use client';
import { FC, PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormProvider } from '@app/components/common/FormProvider';
import { AddEmployeeForm, addEmployeeFormNames } from './AddEmployeeForm.interface';
import { addEmployeeFormSchema } from './AddEmployeeForm.utils';
import { createEmployee } from '@app/actions/user';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { routes } from '@app/constants';
import { usePeopleStore } from '@app/store/people';

export const AddEmployeeFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const resetPeopleState = usePeopleStore((state) => state.reset);
  const form = useForm<AddEmployeeForm>({
    mode: 'onChange',
    defaultValues: {
      [addEmployeeFormNames.firstName]: '',
      [addEmployeeFormNames.lastName]: '',
      [addEmployeeFormNames.email]: '',
      [addEmployeeFormNames.ladder]: {},
      [addEmployeeFormNames.technology]: [],
    },
    resolver: zodResolver(addEmployeeFormSchema),
  });

  const handleSubmit = async (data: AddEmployeeForm, event?: React.FormEvent<HTMLFormElement>) => {
    const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const error = await createEmployee({ ...data, status: submitter?.value || 'draft' });

    if (error) {
      toast.error(error);
      return;
    }

    router.push(routes.people.index);
    toast.success('Employee created!');
    form.reset();
    resetPeopleState();
  };

  return (
    <FormProvider<AddEmployeeForm> onSubmit={handleSubmit} form={form}>
      {children}
    </FormProvider>
  );
};
