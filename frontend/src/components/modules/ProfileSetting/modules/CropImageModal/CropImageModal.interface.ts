import { Point } from '@app/types/common';
import { Area } from 'react-easy-crop';
import { ChangeEvent } from 'react';

export interface CropImageModalProps {
  imageSrc: string | null;
  open: boolean;
  onClose: () => void;
  onSave: (croppedAreaPixels: Area | null) => void;
}

export interface CropImageModalHook {
  crop: Point;
  zoom: number;
  handleCropChange: (location: Point) => void;
  handleZoomChange: (zoom: number) => void;
  handleCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  croppedAreaPixels: Area | null;
  handleSave: () => void;
  handleZoomInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
