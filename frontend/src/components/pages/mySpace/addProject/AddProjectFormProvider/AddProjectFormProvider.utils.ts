import { z } from 'zod';
import { addProjectFormNames } from './AddProjectFormProvider.interface';

export const addProjectFormSchema = z
  .object({
    [addProjectFormNames.title]: z.string().min(2, { message: 'Title must contain at least 2 characters' }),
    [addProjectFormNames.type]: z
      .object({
        name: z.string().optional(),
        id: z.string().optional(),
      })
      .optional(),
    [addProjectFormNames.clarification]: z.string().optional(),
  })
  .refine(
    (data) => {
      // INFO: Check if type.id is 'other' and if so, make sure clarification is not empty
      if (data[addProjectFormNames.type]?.id === 'other') {
        const clarification = data[addProjectFormNames.clarification];
        return clarification !== undefined && clarification.trim().length > 0;
      }
      return true;
    },
    {
      path: [addProjectFormNames.clarification],
      message: 'Clarification is required when type is "other"',
    },
  );
