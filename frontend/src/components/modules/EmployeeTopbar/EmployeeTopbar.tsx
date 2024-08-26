'use client';

import { Modal } from '@app/components/common/Modal';
import { WorkflowTopbar } from '../WorkflowTopbar';
import { useEmployeeTopbar } from './EmployeeTopbar.hook';
import { Typography } from '@app/components/common/Typography';
import { Button } from '@app/components/common/Button';
import { userStatus } from '@app/types/user';

export const EmployeeTopbar = () => {
  const {
    cancelModalOpen,
    setCancelModalOpen,
    isDirty,
    handleBack,
    formValid,
    isSubmitting,
    handleSaveAsDraft,
    emailValid,
  } = useEmployeeTopbar();

  return (
    <>
      <WorkflowTopbar
        title="Add employee"
        cancelTitle="Cancel"
        saveTitle="Save as draft"
        activateTitle="Activate Employee"
        activateButtonValue={userStatus.active}
        onCancel={isDirty ? () => setCancelModalOpen(true) : handleBack}
        onSave={handleSaveAsDraft}
        saveDisabled={!emailValid}
        activateDisabled={!formValid}
      />
      <Modal open={cancelModalOpen} onClose={() => setCancelModalOpen(false)} title="Save as draft?">
        <div className="flex flex-col gap-y-6">
          <Typography variant="body-m/regular" className="text-navy-600">
            Do you want to save this employee as draft?
          </Typography>
          <div className="flex justify-end gap-x-6">
            <Button variant="borderless" styleType="natural" onClick={handleBack}>
              Continue without saving
            </Button>
            <Button
              variant="solid"
              styleType="primary"
              onClick={handleSaveAsDraft}
              disabled={isSubmitting || !emailValid}
            >
              Save as draft
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
