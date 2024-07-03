import { ChangeEvent } from 'react';
import { Area } from 'react-easy-crop';
import { User } from '@app/types/people';

export interface ProfileSettingsProps {
  data: User;
}

export interface ProfileSettingsHook {
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
