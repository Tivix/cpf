'use client';
import Cropper from 'react-easy-crop';
import { ImageIcon } from '@app/static/icons/ImageIcon';
import { Modal } from '@app/components/common/Modal';
import { CropImageModalProps } from './CropImageModal.interface';
import { useCropImageModal } from './CropImageModal.hooks';
import { Button } from '@app/components/common/Button';
import { ZOOM_SLIDER_MULTIPLIER } from './constants';

export const CropImageModal: React.FC<CropImageModalProps> = ({ imageSrc, open, onClose, onSave }) => {
  const { crop, zoom, handleCropChange, handleZoomChange, handleCropComplete, handleZoomInputChange, handleSave } =
    useCropImageModal(onSave);

  return (
    <Modal open={open} onClose={onClose} title="Crop your photo" hideHeaderCloseButton>
      <div className="flex flex-col items-center justify-center gap-6">
        <p className="tracking-wider text-navy-600">
          For best results, use a PNG, JPG, or GIF image at least 300 x 300 px.
        </p>
        <div className="relative h-80 w-80">
          {imageSrc ? (
            <Cropper
              classes={{
                containerClassName: 'absolute top-0 left-0 rounded',
              }}
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={handleCropChange}
              onCropComplete={handleCropComplete}
              onZoomChange={handleZoomChange}
            />
          ) : (
            <div>loader</div>
          )}
        </div>
        <div className="flex flex-row items-center gap-2 text-navy-600">
          <ImageIcon className="h-6 w-6" />
          <input
            type="range"
            min="10"
            max="100"
            value={zoom * ZOOM_SLIDER_MULTIPLIER}
            onChange={handleZoomInputChange}
            className="range h-2 w-full"
          />
          <ImageIcon className="h-9 w-9" />
        </div>
        <div className="flex w-full flex-row justify-end gap-4">
          <Button styleType="natural" variant="borderless" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};
