'use client';
import { FC, PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormProvider } from '@app/components/common/FormProvider';
import { AddEmployeeForm, addEmployeeFormNames } from './AddEmployeeForm.interface';
import { addEmployeeFormSchema } from './AddEmployeeForm.utils';

export const AddEmployeeFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<AddEmployeeForm>({
    mode: 'onBlur',
    defaultValues: {
      [addEmployeeFormNames.firstName]: '',
      [addEmployeeFormNames.lastName]: '',
      [addEmployeeFormNames.email]: '',
      [addEmployeeFormNames.ladder]: {},
      [addEmployeeFormNames.technology]: [],
    },
    resolver: zodResolver(addEmployeeFormSchema),
  });

  return <FormProvider<AddEmployeeForm> form={form}>{children}</FormProvider>;
};
