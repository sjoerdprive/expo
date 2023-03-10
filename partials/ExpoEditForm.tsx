'use client';
import ExpoEditField from 'components/ExpoEditField';
import { Expo, Image } from '@prisma/client';
import React, { FormEvent, use, useEffect, useRef, useState } from 'react';
import ExpoEditToolbar from 'partials/ExpoEditToolbar';
import ExpoMediaEditor from './ExpoMediaEditor';
import { ExpoComponent } from '#/types/ExpoComponent';
import FileUploader from 'components/FileUploader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IExpoEditForm extends ExpoComponent {
  expo: Expo & { images: Image[] };
}

export type ExpoStatus = 'loading' | 'pristine' | 'edited' | 'error';

export default function ExpoEditForm({ expo: initExpo }: IExpoEditForm) {
  const [expo, setExpo] = useState(initExpo);
  const [status, setStatus] = useState<ExpoStatus>('pristine');
  const fileField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'pristine') {
      if (fileField.current) fileField.current.value = '';
    }
  }, [status]);

  // const status = 'pristine';
  // const setStatus = (e: any) => {};

  return (
    <>
      <form
        encType="multipart/form-data"
        // onSubmit={async (e) => {
        //   setStatus('loading');

        //   const res = await saveExpo(e);

        //   setStatus(res.status);

        //   if (res.status === 'error') return;
        //   setExpo((prev) => res.data || prev);
        // }}
        action="/api/expo/update"
        onChange={() => setStatus('edited')}
        method="POST"
        className="position-relative"
      >
        <ExpoEditToolbar className="mb-3" expo={expo} expoStatus={status} />
        <input type="hidden" name="id" value={expo.id} />
        <div className="p-2">
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
            ref={fileField}
          />
          <div className="btn-group">
            <button type="button" className="btn btn-secondary">
              {/* <FontAwesomeIcon icon={fa} /> */}
              Row
            </button>
            <button type="button" className="btn btn-secondary">
              {/* <FontAwesomeIcon icon={fa} /> */}
              Column
            </button>
          </div>
        </div>
        <div className="p-2">
          <ExpoMediaEditor images={expo.images} />
        </div>
      </form>
    </>
  );
}

async function saveExpo(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const data = new FormData(e.currentTarget);

  const res = await fetch('/api/expo/save', {
    method: 'POST',
    body: data,
  });

  const status: ExpoStatus = res.status === 200 ? 'pristine' : 'error';

  return { data: await res.json(), status: status };
}
