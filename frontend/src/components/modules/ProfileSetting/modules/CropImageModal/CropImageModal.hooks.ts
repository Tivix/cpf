import { ChangeEvent, useState } from 'react';
import { Point } from '@app/types/common';
import { CropImageModalHook } from './CropImageModal.interface';
import { Area } from 'react-easy-crop';
import { ZOOM_SLIDER_MULTIPLIER } from './constants';

export const useCropImageModal = (onSave: (croppedAreaPixels: Area | null) => void): CropImageModalHook => {
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

  const handleSave = () => {
    onSave(croppedAreaPixels);
  };

  const handleZoomInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleZoomChange(parseInt(e.target.value) / ZOOM_SLIDER_MULTIPLIER);
  };

  return {
    crop,
    zoom,
    handleZoomChange,
    handleCropChange,
    handleCropComplete,
    croppedAreaPixels,
    handleSave,
    handleZoomInputChange,
  };
};
