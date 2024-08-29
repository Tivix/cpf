import { Option } from '@app/types/common';
import { OutputData } from '@editorjs/editorjs';

export const addProjectFormNames = {
  title: 'title',
  type: 'type',
  details: 'details',
  clarification: 'clarification',
} as const;

export interface AddProjectForm {
  [addProjectFormNames.title]: string;
  [addProjectFormNames.type]: Option;
  [addProjectFormNames.clarification]: string;
  [addProjectFormNames.details]: OutputData;
}
