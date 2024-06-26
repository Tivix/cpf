'use client';
import { ProfileSettingsProps } from './ProfileSetting.interface';
import { Card } from '@app/components/common/Card';
import { SlackIcon } from '@app/static/icons/SlackIcon';
import { EnvelopeIcon } from '@app/static/icons/EnvelopeIcon';
import { EditIcon } from '@app/static/icons/EditIcon';
import { DeleteIcon } from '@app/static/icons/DeleteIcon';
import { Avatar } from '@app/components/common/Avatar';
import { useProfileSettings } from '@app/components/modules/ProfileSetting/ProfileSetting.hooks';
import { CropImageModal } from '@app/components/modules/CropImageModal';
import { ReactNode } from 'react';

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ data }) => {
  const { firstName, lastName, email, ladders, photo } = data;
  const { imageSrc, handleFileChange, modalOpen, handleCloseModal, handleSaveCroppedImage } = useProfileSettings();

  const NotificationCheckbox: React.FC<{ icon: ReactNode }> = ({ icon }) => (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-navy-500">{icon}</div>
      <div className="flex h-6 items-center">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
      </div>
    </div>
  );

  const PersonalDetailsDataItem = ({ title, value }) => (
    <div className="border-b border-navy-200 px-4 py-6 sm:col-span-2 sm:px-0">
      <dt className="text-base font-medium leading-6 text-navy-900">{title}</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{value}</dd>
    </div>
  );

  const LadderDataItem: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
    <div>
      <dt className="text-base font-medium leading-6 text-navy-900">{title}</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{value}</dd>
    </div>
  );

  return (
    <section className="py-16 flex flex-col items-center w-full gap-6">
      <Card title="Personal details">
        <div className="flex flex-row w-full border-b border-navy-200 px-4 py-6 sm:col-span-2 sm:px-0">
          <div className="grow">
            <div className="text-base font-medium leading-6 text-navy-900 mb-2">Profile photo</div>
            <Avatar firstName={firstName} lastName={lastName} imageUrl={photo} />
          </div>
          <div className="flex flex-row gap-4">
            <label className="rounded-full bg-white h-11 w-11 flex items-center justify-center text-navy-600 shadow-sm hover:bg-navy-100 border border-navy-300">
              <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
              <EditIcon className="h-5 w-5" aria-hidden="true" />
            </label>
            <button
              type="button"
              className="rounded-full bg-white h-11 w-11 flex items-center justify-center text-navy-600 shadow-sm hover:bg-navy-100 border border-navy-300"
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
          <div className="flex flex-col gap-6 border border-navy-200 rounded-xl p-6" key={ladderName}>
            <LadderDataItem title="Ladder" value={ladderName} />
            <LadderDataItem title="Technology" value={technology} />
            <LadderDataItem title="Band" value={band} />
          </div>
        ))}
      </Card>
      <Card title="Notifications">
        <div className="flex flex-row">
          <div className="self-end grow">
            <p>Send me notifications via</p>
          </div>
          <div className="flex flex-row gap-8">
            <NotificationCheckbox icon={<SlackIcon />} />
            <NotificationCheckbox icon={<EnvelopeIcon />} />
          </div>
        </div>
      </Card>
      <CropImageModal open={modalOpen} imageSrc={imageSrc} onClose={handleCloseModal} onSave={handleSaveCroppedImage} />
    </section>
  );
};
