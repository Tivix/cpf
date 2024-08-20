'use client';
import { FC, PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormProvider } from '@app/components/common/FormProvider';
import { AddEmployeeForm, addEmployeeFormNames } from './AddEmployeeForm.interface';
import { addEmployeeFormSchema } from './AddEmployeeForm.utils';
import { signupEmployee } from '@app/actions/user';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { routes } from '@app/constants';

export const AddEmployeeFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
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

  const handleSubmit = async (data: AddEmployeeForm) => {
    const error = await signupEmployee(data);

    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Employee created!');
    router.push(routes.people.index);
  };

  return (
    <FormProvider<AddEmployeeForm> onSubmit={handleSubmit} form={form}>
      {children}
    </FormProvider>
  );
};
