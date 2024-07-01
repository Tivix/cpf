'use client';
import { Button } from '@app/components/common/Button';
import { FormProvider } from '@app/components/common/FormProvider';
import { Input } from '@app/components/common/Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface PersonalDetailsForm {
  firstName: string;
  lastName: string;
  email: string;
}

export default function PersonalDetails() {
  const [num, setNum] = useState(0);
  const form = useForm<PersonalDetailsForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  return (
    <FormProvider<PersonalDetailsForm> form={form}>
      <div className="mb-6 text-2xl font-semibold leading-7">Personal details</div>
      <div className="grid w-full grid-cols-2 rounded-[20px] bg-white p-8">
        <Input name="firstName" />
        <Input name="lastName" />
        <Input name="email" />
      </div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setNum((prev) => prev + 1);
        }}
      >
        {num}
      </Button>
    </FormProvider>
  );
}
