'use client';
import { ProfileSettingsProps } from './ProfileSetting.interface';
import { Card } from '@app/components/common/Card';
import { SlackIcon } from '@app/static/icons/SlackIcon';
import { Envelope } from '@app/static/icons/Envelope';
import { EditIcon } from '@app/static/icons/EditIcon';
import { DeleteIcon } from '@app/static/icons/DeleteIcon';

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ data }) => {
  const { firstName, lastName, email, ladders } = data;
  return (
    <section className="py-16 flex flex-col items-center w-full gap-6">
      <Card title="Personal details">
        <div className="flex flex-row w-full border-b border-navy-200 px-4 py-6 sm:col-span-2 sm:px-0">
          <div className="grow">
            <div className="text-base font-medium leading-6 text-navy-900">Profile photo</div>
            <div className="h-[72px] w-[72px] mt-1 rounded-full bg-blue-700 flex justify-center items-center">
              <span className="text-2xl text-white">
                {firstName[0]}
                {lastName[0]}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <button
              type="button"
              className="rounded-full bg-white h-11 w-11 flex items-center justify-center text-navy-600 shadow-sm hover:bg-navy-100 border border-navy-300"
            >
              <EditIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="rounded-full bg-white h-11 w-11 flex items-center justify-center text-navy-600 shadow-sm hover:bg-navy-100 border border-navy-300"
            >
              <DeleteIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="border-b border-navy-200 px-4 py-6 sm:col-span-2 sm:px-0">
          <dt className="text-base font-medium leading-6 text-navy-900">Full Name</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
            {firstName} {lastName}
          </dd>
        </div>
        <div className="border-b border-navy-200 px-4 py-6 sm:col-span-2 sm:px-0">
          <dt className="text-base font-medium leading-6 text-navy-900">Email</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{email}</dd>
        </div>
      </Card>
      <Card title="Ladders">
        {ladders.map(({ ladderName, technology, band }) => (
          <div className="flex flex-col gap-6 border border-navy-200 rounded-xl p-6" key={ladderName}>
            <div>
              <dt className="text-base font-medium leading-6 text-navy-900">Ladder</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{ladderName}</dd>
            </div>
            <div>
              <dt className="text-base font-medium leading-6 text-navy-900">Technology</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{technology}</dd>
            </div>
            <div>
              <dt className="text-base font-medium leading-6 text-navy-900">Band</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{band}</dd>
            </div>
          </div>
        ))}
      </Card>
      <Card title="Notifications">
        <div className="flex flex-row">
          <div className="self-end grow">
            <p>Send me notifications via</p>
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-6 text-navy-500">
                <SlackIcon />
              </div>
              <div className="flex h-6 items-center">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-6 text-navy-500">
                <Envelope />
              </div>
              <div className="flex h-6 items-center">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
