import { Option } from '@app/types/common';

export const addProjectFormNames = {
  title: 'title',
  type: 'type',
  details: 'details',
} as const;

export interface AddProjectForm {
  [addProjectFormNames.title]: string;
  [addProjectFormNames.type]: Option;
  [addProjectFormNames.details]: string;
}

export const addProjectFirstStepFields = [
  addProjectFormNames.title,
  addProjectFormNames.type,
  addProjectFormNames.details,
] as const;
