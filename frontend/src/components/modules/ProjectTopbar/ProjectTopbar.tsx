'use client';

import { Modal } from '@app/components/common/Modal';
import { WorkflowTopbar } from '../WorkflowTopbar';
import { useProjectTopbar } from './ProjectTopbar.hook';
import { Typography } from '@app/components/common/Typography';
import { Button } from '@app/components/common/Button';

export const ProjectTopbar = () => {
  const { cancelModalOpen, setCancelModalOpen, handleBack, handleSaveAsDraft, isDirty, isSubmitting, formValid } =
    useProjectTopbar();

  return (
    <>
      <WorkflowTopbar
        title="Add project"
        cancelTitle="Cancel"
        saveTitle="Save as draft"
        activateTitle="Submit to manager"
        onCancel={isDirty ? () => setCancelModalOpen(true) : handleBack}
        onSave={handleSaveAsDraft}
        saveDisabled={!formValid}
        activateDisabled={!formValid}
      />
      <Modal open={cancelModalOpen} onClose={() => setCancelModalOpen(false)} title="Save as draft?">
        <div className="flex flex-col gap-y-6">
          <Typography variant="body-m/regular" className="text-navy-600">
            Do you want to save this project as draft?
          </Typography>
          <div className="flex justify-end gap-x-6">
            <Button variant="borderless" styleType="natural" onClick={handleBack}>
              Continue without saving
            </Button>
            <Button variant="solid" styleType="primary" onClick={handleSaveAsDraft} disabled={isSubmitting}>
              Save as draft
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
