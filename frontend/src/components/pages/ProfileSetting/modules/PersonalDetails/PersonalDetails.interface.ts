import { ChangeEvent } from 'react';
import { Area } from 'react-easy-crop';

export interface PersonalDetailsProps {
  data: {
    photo?: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface PersonalDetailsHook {
  imageSrc: string | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  cropModalOpen: boolean;
  deleteModalOpen: boolean;
  handleCloseCropModal: () => void;
  handleCloseDeleteModal: () => void;
  handleDeleteImage: () => void;
  handleSaveCroppedImage: (croppedAreaPixels: Area | null) => void;
  handleOpenDeleteModal: () => void;
}
