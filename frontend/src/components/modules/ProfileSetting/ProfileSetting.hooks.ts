import { ProfileSettingsHook } from '@app/components/modules/ProfileSetting/ProfileSetting.interface';
import { ChangeEvent, useState } from 'react';
import { readFile } from '@app/components/modules/ProfileSetting/utils';
import {getCroppedImg} from "@app/utils/canvasUtils";
import {Area} from "react-easy-crop";

export const useProfileSettings = (): ProfileSettingsHook => {
  const [imageSrc, setImageSrc] = useState<string>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files?.[0];

      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setImageSrc(null);
  }

  const handleSaveCroppedImage = async (croppedAreaPixels: Area) => {
    try {
      const img = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (img) {
        // TODO: send new avatar to api
        setModalOpen(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    imageSrc,
    handleFileChange,
    modalOpen,
    handleCloseModal,
    handleSaveCroppedImage,
  };
};
