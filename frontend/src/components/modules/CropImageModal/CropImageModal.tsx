import Cropper from 'react-easy-crop';
import { ImageIcon } from '@app/static/icons/ImageIcon';
import { Modal } from '@app/components/common/Modal';
import { CropImageModalProps } from '@app/components/modules/CropImageModal/CropImageModal.interface';
import { useCropImageModal } from '@app/components/modules/CropImageModal/CropImageModal.hooks';

export const CropImageModal: React.FC<CropImageModalProps> = ({ imageSrc, open, oCropComplete }) => {
  const { crop, zoom, handleCropChange, handleZoomChange } = useCropImageModal();
  return (
    <Modal open={open} onClose={() => console.log('close')} title="Crop your photo">
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
              onCropComplete={oCropComplete}
              onZoomChange={handleZoomChange}
            />
          ) : (
            <div>loader</div>
          )}
        </div>
        <div className="flex flex-row gap-2 items-center text-navy-600">
          <ImageIcon className="w-12 h-12" />
          <input
            type="range"
            min="10"
            max="100"
            value={zoom * 10}
            onChange={(e) => handleZoomChange(e.target.value / 10)}
            className="w-full h-2 range"
          />
          <ImageIcon className="w-20 h-20" />
        </div>
      </div>
    </Modal>
  );
};
