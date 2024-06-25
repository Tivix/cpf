'use client';
import { ProfileSettingsProps } from './ProfileSetting.interface';
import { Card } from '@app/components/common/Card';
import { SlackIcon } from '@app/static/icons/SlackIcon';
import { EnvelopeIcon } from '@app/static/icons/EnvelopeIcon';
import { EditIcon } from '@app/static/icons/EditIcon';
import { DeleteIcon } from '@app/static/icons/DeleteIcon';
import { useState } from 'react';
import { Modal } from '@app/components/common/Modal';
import Cropper from 'react-easy-crop';
import { Avatar } from '@app/components/common/Avatar';
import {ImageIcon} from "@app/static/icons/ImageIcon";

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ data }) => {
  const { firstName, lastName, email, ladders, photo } = data;

  const [imageSrc, setImageSrc] = useState<unknown>();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedAreaPixels.width / croppedAreaPixels.height);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      try {
        let imageDataUrl = await readFile(file);
        setImageSrc(imageDataUrl);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleZoomChange = (event) => {
    setZoom(event.target.value/10);
  };

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
              <input type="file" onChange={onFileChange} accept="image/*" className="hidden" />
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
                <EnvelopeIcon />
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
      <Modal open={Boolean(imageSrc)} onClose={() => console.log('close')} title="Crop your photo">
        <div className="flex flex-col justify-center items-center gap-6">
          <p className="text-navy-600 tracking-wider">
            For best results, use a PNG, JPG, or GIF image at least 300 x 300 px.
          </p>
          <div className="relative h-80 w-80">
            <Cropper
              classes={{
                containerClassName: 'absolute top-0 left-0 rounded',
              }}
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
            />
          </div>
          <div className="flex flex-row gap-2 items-center text-navy-600">
            <ImageIcon className="w-12 h-12" />
            <input
              type="range"
              min="10"
              max="100"
              value={zoom*10}
              onChange={handleZoomChange}
              className="w-full h-2 range"
            />
            <ImageIcon className="w-20 h-20" />
          </div>
        </div>
      </Modal>
    </section>
  );
};
