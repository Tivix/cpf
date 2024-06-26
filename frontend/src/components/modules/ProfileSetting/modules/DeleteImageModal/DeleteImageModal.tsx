import { Modal } from '@app/components/common/Modal';
import { Button } from '@app/components/common/Button';
import {
  DeleteImageModalProps
} from "./DeleteImageModal.interface";

export const DeleteImageModal: React.FC<DeleteImageModalProps> = ({ open, onClose, onDelete }) => {
  return (
      <Modal open={open} onClose={onClose} title="Delete profile photo">
        <div className="flex flex-col justify-center items-center gap-6">
          <p className="text-navy-600 ">
            Your current photo will be replaced with a default avatar.
            Do you want to proceed?
          </p>
          <div className="w-full flex flex-row justify-end gap-4">
            <Button title="Cancel" color="navy" uiType="borderless" onClick={onClose} />
            <Button title="Delete photo" color="red" onClick={onDelete} />
          </div>
        </div>
      </Modal>
  );
};

