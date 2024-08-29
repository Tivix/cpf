'use client';
import { Input } from '@app/components/common/Input';
import { Typography } from '@app/components/common/Typography';
import { addProjectFormNames } from '../AddProjectFormProvider/AddProjectFormProvider.interface';
import { Combobox } from '@app/components/common/Combobox';
import Editor from '@app/components/common/Editor/Editor';
import { useState } from 'react';

const projectTypes = [
  { name: 'Course', id: 'course' },
  { name: 'Kellton project', id: 'kelltonProject' },
  { name: 'Proof of concept', id: 'poc' },
  { name: 'Case study', id: 'caseStudy' },
  { name: 'Other', id: 'other' },
];

export const ProjectDetails = () => {
  const [data, setData] = useState();
  return (
    <>
      <Typography variant="head-m/semibold" className="mb-6">
        Project details
      </Typography>
      {/* <div className="mb-6 grid grid-flow-col grid-cols-2 grid-rows-3 gap-x-8 gap-y-6 rounded-[20px] border border-navy-200 bg-white p-8"> */}
      <div className="flex flex-col gap-x-8 gap-y-6 rounded-[20px] border border-navy-200 bg-white p-8">
        <Input name={addProjectFormNames.title} label="Project title" />
        <Combobox className="w-1/2" label="Project type" options={projectTypes} name={addProjectFormNames.type} />
        <div className="w-full">
          <Editor data={data} onChange={setData} className="h-96" label="Project details" />
        </div>
        {/* <Input name={addProjectFormNames.title} label="Project title" /> */}
      </div>
    </>
    // <>
    //   <Typography variant="head-m/semibold" className="mb-6">
    //     Personal details
    //   </Typography>
    //   <div className="mb-6 flex flex-col gap-x-8 gap-y-6 rounded-[20px] border border-navy-200 bg-white p-8">
    //     <Input name={addProjectFormNames.title} label="Project title" />
    //     <div className="w-1/2">
    //       <Combobox label="Project type" options={projectTypes} name={addProjectFormNames.type} />
    //     </div>
    //     <Input name={addProjectFormNames.title} label="Project title" />
    //   </div>
    // </>
  );
};