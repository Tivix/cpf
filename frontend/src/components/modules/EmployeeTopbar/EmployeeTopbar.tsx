'use client';

import { WorkflowTopbar } from '../WorkflowTopbar';

export const EmployeeTopbar = () => {
  return (
    <WorkflowTopbar
      title="Add employee"
      cancelTitle="Cancel"
      saveTitle="Save as draft"
      activateTitle="Activate Employee"
      onCancel={() => {}}
      onSave={() => {}}
      onActivate={() => {}}
    />
  );
};
