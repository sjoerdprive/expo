'use client';

import { Image } from '@prisma/client';
import ExpoEditField from './ExpoEditField';
import classNames from 'classnames';

interface IMediaEditorProps {
  file: Image;
  className?: string;
}

export default function MediaEditor({ file, className }: IMediaEditorProps) {
  return (
    <fieldset
      name={file.id}
      className={classNames('d-flex flex-column p-3', className)}
    >
      <legend>{file.title}</legend>
      <div className="d-flex row">
        <img src={file.src} alt="" className="col" />
        <div className="col">
          <ExpoEditField
            value={file.title}
            className="mb-2"
            label="Titel"
            name={`${file.id}.title`}
          />
          <ExpoEditField
            value={file.alt}
            className="mb-2"
            label="Tekstalternatief"
            name={`${file.id}.alt`}
          />
          <ExpoEditField
            value={file.caption || ''}
            className="mb-2"
            label="Caption"
            name={`${file.id}.caption`}
          />
        </div>
      </div>
    </fieldset>
  );
}
