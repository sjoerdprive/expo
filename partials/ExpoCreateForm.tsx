'use client';
import ExpoEditField from 'components/ExpoEditField';
import React, { FormEvent, use, useEffect, useRef, useState } from 'react';
import { ExpoComponent } from '#/types/ExpoComponent';
import { ExpoStatus } from './ExpoEditForm';
import { useRouter } from 'next/navigation';

interface IExpoEditForm extends ExpoComponent {}

export default function ExpoCreateForm({}: IExpoEditForm) {
  const [status, setStatus] = useState<ExpoStatus>('pristine');
  const router = useRouter();

  return (
    <>
      <form
        encType="multipart/form-data"
        action="/api/expo/update"
        // onSubmit={async (e) => {
        //   setStatus('loading');

        //   const res = await saveExpo(e);

        //   setStatus(res.status);

        //   if (res.status === 'error') return;

        //   router.push(`/dashboard/expos/edit/${res.data.id}`);
        // }}
        method="POST"
      >
        <div className="p-2">
          <ExpoEditField
            description="De titel van je Expo. Deze is bovenaan de pagina te zien."
            name="title"
            label="Titel"
            className="mb-4"
            required
          />
          <ExpoEditField
            description="Een (korte) beschrijving van jouw Expo. Denk aan de tekst achterop een
          boek."
            label="Blurb"
            name="blurb"
            type="textarea"
            className="mb-4"
          />
          <button className="btn btn-primary">
            {status === 'loading' ? (
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              ''
            )}
            Opslaan
          </button>
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

  const expo = await res.json();

  return { data: expo, status: status };
}
