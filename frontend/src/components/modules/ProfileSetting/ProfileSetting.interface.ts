import { ChangeEvent } from 'react';
import {Area} from "react-easy-crop";

export interface ProfileSettingsProps {
  data: {
    photo?: string;
    firstName: string;
    lastName: string;
    email: string;
    ladders: {
      ladderName: string;
      technology: string;
      band: string | number;
    }[];
    notifications: {
      slack: boolean;
      email: boolean;
    };
  };
}

export interface ProfileSettingsHook {
  imageSrc: string | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  modalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveCroppedImage: (croppedAreaPixels: Area) => void;
}
