'use client';
import { FormProvider } from '@app/components/common/FormProvider';
import { Input } from '@app/components/common/Input';
import { useForm } from 'react-hook-form';

enum PersonalDetailsFormNames {
  firstName = 'firstName',
  lastName = 'lastName',
  email = 'email',
}
interface PersonalDetailsForm {
  [PersonalDetailsFormNames.firstName]: string;
  [PersonalDetailsFormNames.lastName]: string;
  [PersonalDetailsFormNames.email]: string;
}

export default function PersonalDetails() {
  const form = useForm<PersonalDetailsForm>({
    defaultValues: {
      [PersonalDetailsFormNames.firstName]: '',
      [PersonalDetailsFormNames.lastName]: '',
      [PersonalDetailsFormNames.email]: '',
    },
  });

  return (
    <FormProvider<PersonalDetailsForm> form={form}>
      <div className="mb-6 text-2xl font-semibold leading-7">Personal details</div>
      <div className="grid w-full grid-cols-2 rounded-[20px] bg-white p-8">
        <Input name={PersonalDetailsFormNames.firstName} placeholder="First Name" />
        <Input name={PersonalDetailsFormNames.lastName} />
        <Input name={PersonalDetailsFormNames.email} />
      </div>
    </FormProvider>
  );
}
