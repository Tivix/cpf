import { ProfileSettingsHook } from '@app/components/modules/ProfileSetting/ProfileSetting.interface';
import { ChangeEvent, useState } from 'react';
import { readFile } from '@app/components/modules/ProfileSetting/utils';
import { getCroppedImg } from '@app/utils/canvasUtils';
import { Area } from 'react-easy-crop';

export const useProfileSettings = (): ProfileSettingsHook => {
  const [imageSrc, setImageSrc] = useState<string>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files?.[0];

      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setCropModalOpen(true);
    }
  };

  const handleCloseCropModal = () => {
    setCropModalOpen(false);
    setImageSrc(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = () => setDeleteModalOpen(true);

  const handleSaveCroppedImage = async (croppedAreaPixels: Area) => {
    try {
      const img = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (img) {
        // TODO: send new avatar to api
        setCropModalOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteImage = () => {
    // TODO: delete photo
    setDeleteModalOpen(false);
  }

  return {
    imageSrc,
    handleFileChange,
    cropModalOpen,
    handleCloseCropModal,
    handleSaveCroppedImage,
    deleteModalOpen,
    handleCloseDeleteModal,
    handleDeleteImage,
    handleOpenDeleteModal,
  };
};
