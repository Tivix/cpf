'use client';
import { Input } from '@app/components/common/Input';
import { Typography } from '@app/components/common/Typography';
import { addProjectFormNames } from '../AddProjectFormProvider/AddProjectFormProvider.interface';
import { Combobox } from '@app/components/common/Combobox';
import Editor from '@app/components/common/Editor/Editor';
import { Button } from '@app/components/common/Button';
import { useRouter } from 'next/navigation';
import { routes } from '@app/constants';
import { useProjectDetails } from './ProjectDetails.hooks';
import { projectTypes } from './ProjectTypes.utils';

export const ProjectDetails = () => {
  const router = useRouter();
  const { formValid, otherProjectType } = useProjectDetails();

  return (
    <>
      <Typography variant="head-m/semibold" className="mb-6">
        Project details
      </Typography>
      <div className="flex flex-col gap-x-8 gap-y-6 rounded-[20px] border border-navy-200 bg-white p-8">
        <Input name={addProjectFormNames.title} label="Project title" />
        <Combobox className="w-1/2" label="Project type" options={projectTypes} name={addProjectFormNames.type} />
        {otherProjectType && (
          <Input name={addProjectFormNames.clarification} label="Please clarify" className="w-1/2" />
        )}
        <div className="w-full">
          <Editor name={addProjectFormNames.details} className="h-96" label="Project details" />
        </div>
        <div className="flex justify-end">
          <Button
            styleType="primary"
            variant="border"
            onClick={() => router.push(routes.mySpace.addNew.scope)}
            disabled={!formValid}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};
