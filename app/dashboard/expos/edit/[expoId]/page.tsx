import { prisma } from '#/prisma';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import ExpoEditForm from 'partials/ExpoEditForm';
import { FormEvent } from 'react';

interface IEditExpoPageProps {
  params: { expoId: string; query: any };
}

export default async function EditExpoPage({ params }: IEditExpoPageProps) {
  const { expoId } = params;

  const expo = await getExpoById(expoId);


  if (!expo)
    return (
      <div className="border border-warn rounded text-warn p-5">
        <FontAwesomeIcon className="me-2" icon={faWarning} />
        Er is iets fout gegaan! Deze Expo is niet beschikbaar.
      </div>
    );

  return (
    <div className="p-5 container">
      <div className="row mb-5">
        <div className="col">
          <h1 className="mb-0">{expo.title}</h1>
          <small className="text-muted">/{expo.slug}</small>
        </div>
        <div className="col">
          <details>
            <summary>Metadata</summary>
            <pre>{JSON.stringify(expo, null, 2)}</pre>
          </details>
        </div>
      </div>

      <ExpoEditForm expo={expo} />
    </div>
  );
}

async function getExpoById(id: string) {
  return await prisma.expo.findUnique({
    where: { id: id },
    include: { images: true },
  });
}
