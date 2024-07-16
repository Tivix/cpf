'use client';
import { FC, PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';

import { FormProvider } from '@app/components/common/FormProvider';
import { AddEmployeeForm, addEmployeeFormNames } from './AddEmployeeForm.interface';

export const AddEmployeeFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<AddEmployeeForm>({
    mode: 'onChange',
    defaultValues: {
      [addEmployeeFormNames.firstName]: '',
      [addEmployeeFormNames.lastName]: '',
      [addEmployeeFormNames.email]: '',
      [addEmployeeFormNames.ladder]: {},
      [addEmployeeFormNames.technology]: [],
    },
  });
  return <FormProvider<AddEmployeeForm> form={form}>{children}</FormProvider>;
};
