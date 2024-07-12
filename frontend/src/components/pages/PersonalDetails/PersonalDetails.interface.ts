export const PersonalDetailsFormNames = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
} as const;

export interface PersonalDetailsForm {
  [PersonalDetailsFormNames.firstName]: string;
  [PersonalDetailsFormNames.lastName]: string;
  [PersonalDetailsFormNames.email]: string;
}
