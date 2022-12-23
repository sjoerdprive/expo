'use client';
import ExpoEditField from 'components/ExpoEditField';
import { Expo, Image } from '@prisma/client';
import React, { FormEvent, Suspense, useState } from 'react';
import former from '#/utils/former';
import ExpoEditToolbar from 'partials/ExpoEditToolbar';
import ExpoMediaEditor from './ExpoMediaEditor';

interface IExpoEditForm {
  expo: Expo & { images: Image[] };
}

export default function ExpoEditForm({ expo }: IExpoEditForm) {
  const [status, setStatus] = useState<
    'loading' | 'pristine' | 'edited' | 'error'
  >('pristine');

  return (
    <form
      onSubmit={(e) => saveExpo(e, setStatus)}
      onChange={() => setStatus('edited')}
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
        />
        <ExpoEditField
          description="Een (korte) beschrijving van jouw Expo. Denk aan de tekst achterop een
          boek."
          label="Blurb"
          name="blurb"
          type="textarea"
          value={expo.blurb || ''}
        />
        <ExpoEditField
          description="Alle foto's en video's die jou Expo maken."
          label="Media"
          name="media"
          type="file"
        />
      </div>
      <ExpoMediaEditor images={expo.images} />
    </form>
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

  const data = former(e.currentTarget);

  const res = await fetch('/api/expo/save', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const responseBody = await res.json();

  if (res.status === 200) setStatus('pristine');
  if (res.status !== 200) setStatus('error');

  console.log(responseBody);
}
