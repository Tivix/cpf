import { useState } from 'react';
import { Point } from '@app/types/common';
import { CropImageModalHook } from './CropImageModal.interface';
import { Area } from 'react-easy-crop';

export const useCropImageModal = (): CropImageModalHook => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleCropChange = (location: Point) => {
    setCrop(location);
  };

  const handleZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return {
    crop,
    zoom,
    handleZoomChange,
    handleCropChange,
    handleCropComplete,
    croppedAreaPixels,
  };
};
