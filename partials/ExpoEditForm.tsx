'use client';
import ExpoEditField from 'components/ExpoEditField';
import { Expo, Image } from '@prisma/client';
import React, { FormEvent, Suspense, useState } from 'react';
import former from '#/utils/former';
import ExpoEditToolbar from 'partials/ExpoEditToolbar';
import ExpoMediaEditor from './ExpoMediaEditor';
import { ExpoComponent } from '#/types/ExpoComponent';
import UploadPreview from 'components/UploadPreview';
import FileUploader from 'components/FileUploader';

interface IExpoEditForm extends ExpoComponent {
  expo: Expo & { images: Image[] };
}

export default function ExpoEditForm({ expo }: IExpoEditForm) {
  const [status, setStatus] = useState<
    'loading' | 'pristine' | 'edited' | 'error'
  >('pristine');

  // const status = 'pristine';
  // const setStatus = (e: any) => {};

  return (
    <>
      <form
        encType="multipart/form-data"
        onSubmit={(e) => saveExpo(e, setStatus)}
        onChange={() => setStatus('edited')}
        method="POST"
      >
        <div className="mb-3">
          <ExpoEditToolbar expo={expo} expoStatus={status} />
        </div>
        <div className="p-2">
          <input type="hidden" name="id" value={expo.id} />
          <ExpoEditField
            description="De titel van je Expo. Deze is bovenaan de pagina te zien."
            name="title"
            label="Titel"
            value={expo.title}
            className="mb-4"
          />
          <ExpoEditField
            description="Een (korte) beschrijving van jouw Expo. Denk aan de tekst achterop een
          boek."
            label="Blurb"
            name="blurb"
            type="textarea"
            value={expo.blurb || ''}
            className="mb-4"
          />

          <FileUploader
            name="media"
            label="Media"
            description="Alle foto's en video's die jou Expo maken."
            multiple
            showPreview
          />
        </div>
      </form>
      <div className="p-2">
        <ExpoMediaEditor images={expo.images} />
      </div>
    </>
  );
}

async function saveExpo(
  e: FormEvent<HTMLFormElement>,
  setStatus: React.Dispatch<
    React.SetStateAction<'loading' | 'pristine' | 'edited' | 'error'>
  >
) {
  e.preventDefault();

  setStatus('loading');

  // const data = former(e.currentTarget);
  const data = new FormData(e.currentTarget);

  const res = await fetch('/api/expo/save', {
    method: 'POST',
    body: data,
  });

  if (res.status === 200) setStatus('pristine');
  if (res.status !== 200) setStatus('error');
}
