'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import { faPencil, faSave } from '@fortawesome/free-solid-svg-icons';
import { Expo, Image } from '@prisma/client';
import ExpoEditField from 'components/ExpoEditField';
import MediaEditor from 'components/MediaEditor';
import { FormEvent } from 'react';

interface IDeleteExpoModalProps {
  media: Image[];
}

export default function EditMediaModal({ media }: IDeleteExpoModalProps) {
  return (
    <>
      <Modal
        size="lg"
        btnClass="btn btn-link text-white text-decoration-none"
        modalId="edit-media-modal"
        btnText={
          <span>
            <FontAwesomeIcon icon={faPencil} className="me-2" />
            Bewerk
          </span>
        }
        title="Media bewerken"
      >
        <div className="text-black">
          <form action="/api/image/update" method="POST">
            {media.map((file, i) => (
              <>
                <MediaEditor key={i} file={file} />
                <hr />
              </>
            ))}
            <div className="p-3">
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faSave} className="me-2" />
                Opslaan
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

async function saveMedia(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const data = new FormData(e.currentTarget);

  const res = await fetch('/api/media/update', {
    method: 'POST',
    body: data,
  });

  const success = res.ok;

  return success;
}
