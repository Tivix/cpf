import { CheckboxOption, Option } from '@app/types/common';
import { OutputData } from '@editorjs/editorjs';

export const addProjectFormNames = {
  title: 'title',
  type: 'type',
  details: 'details',
  clarification: 'clarification',
  bucket: 'bucket',
  skills: 'skills',
} as const;

export interface AddProjectForm {
  [addProjectFormNames.title]: string;
  [addProjectFormNames.type]: Option;
  [addProjectFormNames.clarification]: string;
  [addProjectFormNames.details]: OutputData;
  [addProjectFormNames.bucket]: Option;
  [addProjectFormNames.skills]: { [key: string]: { [key: string]: CheckboxOption } };
}
