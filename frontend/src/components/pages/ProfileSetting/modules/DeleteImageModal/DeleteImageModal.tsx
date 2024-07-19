import { Modal } from '@app/components/common/Modal';
import { Button } from '@app/components/common/Button';
import { DeleteImageModalProps } from './DeleteImageModal.interface';
import { Typography } from '@app/components/common/Typography';

export const DeleteImageModal: React.FC<DeleteImageModalProps> = ({ open, onClose, onDelete }) => {
  return (
    <Modal open={open} onClose={onClose} title="Delete profile photo">
      <div className="flex flex-col items-center justify-center gap-6">
        <Typography variant="body-m/regular" className="text-navy-600">
          Your current photo will be replaced with a default avatar. Do you want to proceed?
        </Typography>
        <div className="flex w-full flex-row justify-end gap-4">
          <Button styleType="natural" variant="borderless" onClick={onClose}>
            Cancel
          </Button>
          <Button styleType="red" onClick={onDelete}>
            Delete photo
          </Button>
        </div>
      </div>
    </Modal>
  );
};
