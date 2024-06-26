import { Point } from '@app/types/common';
import { Area } from 'react-easy-crop';

export interface CropImageModalProps {
  imageSrc: string | null;
  open: boolean;
  onClose: () => void;
  oCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
}

export interface CropImageModalHook {
  crop: Point;
  zoom: number;
  handleCropChange: (location: Point) => void;
  handleZoomChange: (zoom: number) => void;
}
