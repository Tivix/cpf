'use client';
import { Button } from '@app/components/common/Button';
import { Input } from '@app/components/common/Input';
import { Typography } from '@app/components/common/Typography';
import { usePersonalDetails } from './PersonalDetails.hooks';
import { routes } from '@app/constants';
import { useRouter } from 'next/navigation';
import { addEmployeeFormNames } from '../AddEmployeeFormProvider';

export const PersonalDetails = () => {
  const { formValid } = usePersonalDetails();
  const router = useRouter();

  return (
    <>
      <Typography variant="head-m/semibold" className="mb-6">
        Personal details
      </Typography>
      <div className="mb-6 grid w-full grid-cols-2 gap-x-8 gap-y-6 rounded-[20px] border border-navy-200 bg-white p-8">
        <Input name={addEmployeeFormNames.firstName} label="First name" />
        <Input name={addEmployeeFormNames.lastName} label="Last name" />
        <Input name={addEmployeeFormNames.email} label="Email" />
      </div>
      <div className="flex justify-end">
        <Button
          styleType="primary"
          variant="border"
          onClick={() => router.push(routes.people.addNew.mainLadder)}
          disabled={!formValid}
        >
          Continue
        </Button>
      </div>
    </>
  );
};
