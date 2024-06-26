import Cropper from 'react-easy-crop';
import { ImageIcon } from '@app/static/icons/ImageIcon';
import { Modal } from '@app/components/common/Modal';
import { CropImageModalProps } from './CropImageModal.interface';
import { useCropImageModal } from './CropImageModal.hooks';
import { Button } from '@app/components/common/Button';

export const CropImageModal: React.FC<CropImageModalProps> = ({ imageSrc, open, onClose, onSave }) => {
  const { crop, zoom, handleCropChange, handleZoomChange, handleCropComplete, croppedAreaPixels } = useCropImageModal();

  const handleSave = () => {
    onSave(croppedAreaPixels);
  };
  return (
    <Modal open={open} onClose={onClose} title="Crop your photo" hideHeaderCloseButton>
      <div className="flex flex-col justify-center items-center gap-6">
        <p className="text-navy-600 tracking-wider">
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
        <div className="flex flex-row gap-2 items-center text-navy-600">
          <ImageIcon className="w-6 h-6" />
          <input
            type="range"
            min="10"
            max="100"
            value={zoom * 10}
            onChange={(e) => handleZoomChange(e.target.value / 10)}
            className="w-full h-2 range"
          />
          <ImageIcon className="w-9 h-9" />
        </div>
        <div className="w-full flex flex-row justify-end gap-4">
          <Button title="Cancel" color="navy" uiType="borderless" onClick={onClose} />
          <Button title="Save" onClick={handleSave} />
        </div>
      </div>
    </Modal>
  );
};
