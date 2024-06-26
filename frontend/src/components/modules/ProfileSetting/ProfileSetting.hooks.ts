import { ProfileSettingsHook } from '@app/components/modules/ProfileSetting/ProfileSetting.interface';
import { ChangeEvent, useState } from 'react';
import { Area } from 'react-easy-crop';
import { readFile } from '@app/components/modules/ProfileSetting/utils';

export const useProfileSettings = (): ProfileSettingsHook => {
  const [imageSrc, setImageSrc] = useState<string>(null);

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedAreaPixels.width / croppedAreaPixels.height);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files?.[0];

      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  return {
    imageSrc,
    handleCropComplete,
    handleFileChange,
  };
};
