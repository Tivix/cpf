export const filters = [
  { label: 'Current band', value: 'current_band', id: 1 },
  { label: 'Band 1', value: 'band_1', id: 2 },
  { label: 'Band 2', value: 'band_2', id: 3 },
  { label: 'Band 3', value: 'band_3', id: 4 },
  { label: 'Band 4', value: 'band_4', id: 5 },
  { label: 'Band 5', value: 'band_5', id: 6 },
];

export const tabs = [
  {
    title: 'Active',
    employeeActions: ['Manage account'],
  },
  {
    title: 'Drafts',
    employeeActions: ['Delete employee'],
  },
  {
    title: 'Deactivated',
    employeeActions: ['Manage account', 'Activate employee'],
  },
];

export const rowsPerPage = 10;
