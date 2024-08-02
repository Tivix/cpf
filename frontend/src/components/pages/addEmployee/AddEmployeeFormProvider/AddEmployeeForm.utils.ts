import { addEmployeeFormNames } from './AddEmployeeForm.interface';
import { z } from 'zod';

export const addEmployeeFormSchema = z.object({
  [addEmployeeFormNames.firstName]: z.string().min(2, { message: 'First name must contain at least 2 characters' }),
  [addEmployeeFormNames.lastName]: z.string().min(2, { message: 'Last name must contain at least 2 characters' }),
  [addEmployeeFormNames.email]: z.string().regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address'),
  [addEmployeeFormNames.ladder]: z.object({
    name: z.string(),
    id: z.string(),
  }),
  [addEmployeeFormNames.technology]: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .array()
    .refine((techArray) => techArray.some((tech) => tech.id && tech.id.trim() !== ''), {
      message: 'At least one technology must be selected',
    }),
});
