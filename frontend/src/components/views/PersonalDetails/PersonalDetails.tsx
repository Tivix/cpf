'use client';
import { Button } from '@app/components/common/Button';
import { FormProvider } from '@app/components/common/FormProvider';
import { Input } from '@app/components/common/Input';
import { Typography } from '@app/components/common/Typography';
import { PersonalDetailsForm, PersonalDetailsFormNames } from './PersonalDetails.interface';
import { usePersonalDetails } from './PersonalDetails.hooks';

export const PersonalDetails = () => {
  const { form, formValid } = usePersonalDetails();

  return (
    <FormProvider<PersonalDetailsForm> form={form}>
      <Typography variant="head-m/semibold" className="mb-6">
        Personal details
      </Typography>
      <div className="mb-6 grid w-full grid-cols-2 gap-x-8 gap-y-6 rounded-[20px] border border-navy-200 bg-white p-8">
        <Input
          name={PersonalDetailsFormNames.firstName}
          label="First name"
          options={{
            minLength: { value: 2, message: 'First name must contain at least 2 characters' },
            required: { value: true, message: 'First Name is required' },
          }}
        />
        <Input
          name={PersonalDetailsFormNames.lastName}
          label="Last name"
          options={{
            minLength: { value: 2, message: 'Last name must contain at least 2 characters' },
            required: { value: true, message: 'Last name is required' },
          }}
        />
        <Input
          name={PersonalDetailsFormNames.email}
          label="Email"
          options={{
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'invalid email address' },
            required: { value: true, message: 'Email is required' },
          }}
        />
      </div>
      <div className="flex justify-end">
        <Button styleType="primary" variant="border" onClick={(e) => e.preventDefault()} disabled={!formValid}>
          Continue
        </Button>
      </div>
    </FormProvider>
  );
};
