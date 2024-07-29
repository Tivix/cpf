'use client';
import { PersonalDetailsProps } from './PersonalDetails.interface';
import { Typography } from '@app/components/common/Typography';
import { Avatar } from '@app/components/common/Avatar';
import { EditIcon } from '@app/static/icons/EditIcon';
import { DeleteIcon } from '@app/static/icons/DeleteIcon';
import { PersonalDetailsDataItem } from '@app/components/pages/ProfileSetting/utils';
import { Card } from '@app/components/common/Card';
import { usePersonalDetails } from './PersonalDetails.hooks';
import { CropImageModal } from '../CropImageModal';
import { DeleteImageModal } from '../DeleteImageModal';

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data }) => {
  const { firstName, lastName, email, photo } = data;
  const {
    imageSrc,
    handleOpenDeleteModal,
    handleFileChange,
    cropModalOpen,
    handleCloseCropModal,
    deleteModalOpen,
    handleCloseDeleteModal,
    handleDeleteImage,
    handleSaveCroppedImage,
  } = usePersonalDetails();

  return (
    <>
      <Card title="Personal details">
        <div className="flex w-full flex-row border-b border-navy-200 px-4 py-6 sm:col-span-2 sm:px-0">
          <div className="grow">
            <Typography variant="body-m/medium" className="mb-2">
              Profile photo
            </Typography>
            <Avatar initials={`${firstName[0]}${lastName[0]}`} imageUrl={photo} variant="72" />
          </div>
          <div className="flex flex-row gap-4">
            <label className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-300 bg-white text-navy-600 shadow-sm hover:bg-navy-100">
              <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
              <EditIcon className="h-5 w-5" aria-hidden="true" />
            </label>
            <button
              type="button"
              onClick={handleOpenDeleteModal}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-300 bg-white text-navy-600 shadow-sm hover:bg-navy-100"
            >
              <DeleteIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <PersonalDetailsDataItem title="Full Name" value={`${firstName} ${lastName}`} />
        <PersonalDetailsDataItem title="Email" value={email} />
      </Card>
      <CropImageModal
        open={cropModalOpen}
        imageSrc={imageSrc}
        onClose={handleCloseCropModal}
        onSave={handleSaveCroppedImage}
      />
      <DeleteImageModal open={deleteModalOpen} onClose={handleCloseDeleteModal} onDelete={handleDeleteImage} />
    </>
  );
};
