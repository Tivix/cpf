import { ChangeEvent } from 'react';
import { Area } from 'react-easy-crop';

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
  handleCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}
