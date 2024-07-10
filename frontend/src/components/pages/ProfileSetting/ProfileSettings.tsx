'use client';
import { ProfileSettingsProps } from './ProfileSetting.interface';
import { Card } from '@app/components/common/Card';
import { SlackIcon } from '@app/static/icons/SlackIcon';
import { EnvelopeIcon } from '@app/static/icons/EnvelopeIcon';
import { EditIcon } from '@app/static/icons/EditIcon';
import { DeleteIcon } from '@app/static/icons/DeleteIcon';
import { Avatar } from '@app/components/common/Avatar';
import { useProfileSettings } from './ProfileSetting.hooks';
import { CropImageModal } from './modules/CropImageModal';
import { DeleteImageModal } from './modules/DeleteImageModal';
import { Typography } from '@app/components/common/Typography';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { routes } from '@app/constants';
import {
  LadderDataItem,
  NotificationCheckbox,
  PersonalDetailsDataItem,
} from '@app/components/pages/ProfileSetting/utils';

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ data }) => {
  const { firstName, lastName, email, ladders, photo } = data;
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
  } = useProfileSettings();

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'People', href: routes.people.index, current: false },
          { label: 'Profile settings', href: routes.people.myProfile, current: true },
        ]}
      />
      <section className="flex w-full flex-col items-center gap-6 py-16">
        <Card title="Personal details">
          <div className="flex w-full flex-row border-b border-navy-200 px-4 py-6 sm:col-span-2 sm:px-0">
            <div className="grow">
              <Typography variant="body-m/medium" className="mb-2">
                Profile photo
              </Typography>
              <Avatar firstName={firstName} lastName={lastName} imageUrl={photo} variant="72" />
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
        <Card title="Ladders">
          {ladders.map(({ ladderName, technology, band }) => (
            <div className="flex flex-col gap-6 rounded-xl border border-navy-200 p-6" key={ladderName}>
              <LadderDataItem title="LadderDetails" value={ladderName} />
              <LadderDataItem title="Technology" value={technology} />
              <LadderDataItem title="Band" value={band} />
            </div>
          ))}
        </Card>
        <Card title="Notifications">
          <div className="flex flex-row">
            <div className="grow self-end">
              <Typography variant="body-m/medium">Send me notifications via</Typography>
            </div>
            <div className="flex flex-row gap-8">
              <NotificationCheckbox icon={<SlackIcon />} />
              <NotificationCheckbox icon={<EnvelopeIcon />} />
            </div>
          </div>
        </Card>
        <CropImageModal
          open={cropModalOpen}
          imageSrc={imageSrc}
          onClose={handleCloseCropModal}
          onSave={handleSaveCroppedImage}
        />
        <DeleteImageModal open={deleteModalOpen} onClose={handleCloseDeleteModal} onDelete={handleDeleteImage} />
      </section>
    </div>
  );
};
