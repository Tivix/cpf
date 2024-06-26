import { useState } from 'react';
import { Point } from '@app/types/common';
import { CropImageModalHook } from '@app/components/modules/CropImageModal/CropImageModal.interface';

export const useCropImageModal = (): CropImageModalHook => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropChange = (location: Point) => {
    setCrop(location);
  };

  const handleZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  return {
    crop,
    zoom,
    handleZoomChange,
    handleCropChange,
  };
};
