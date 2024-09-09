import { CheckboxOption } from '@app/types/common';

export const NotificationsFormNames = {
  slack: 'slack',
  email: 'email',
} as const;

export interface NotificationsForm {
  [NotificationsFormNames.email]: CheckboxOption;
  [NotificationsFormNames.slack]: CheckboxOption;
}
