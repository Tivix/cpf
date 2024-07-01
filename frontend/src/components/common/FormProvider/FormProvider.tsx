import { FC, PropsWithChildren, ReactNode } from 'react';
import { FieldValues, FormProvider as RHFFormProvider, UseFormReturn } from 'react-hook-form';

interface Props<T extends FieldValues> extends PropsWithChildren {
  form: UseFormReturn<T>;
  onSubmit?: (values: T) => void;
}

export const FormProvider = <T extends FieldValues>({ form, onSubmit, children }: Props<T>) => {
  return (
    <RHFFormProvider {...form}>
      <form {...(onSubmit && { onSubmit: form.handleSubmit(onSubmit) })}>{children}</form>
    </RHFFormProvider>
  );
};
