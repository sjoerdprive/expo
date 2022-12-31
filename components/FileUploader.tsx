'use client';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useId, useState } from 'react';
import UploadPreview from './UploadPreview';

interface IFileUploaderProps {
  name: string;
  label: string;
  className?: string;
  description?: string;
  multiple?: boolean;
  showPreview?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export default function FileUploader({
  label,
  description,
  showPreview,
  className,
  ...inputProps
}: IFileUploaderProps) {
  const fieldId = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setDragOver] = useState(false);

  const deletePreview = (fileToDelete: File) => {
    setFiles((prev) => prev.filter((f) => f !== fileToDelete));
  };

  return (
    <div className={classNames(className, 'expo-file-uploader')}>
      <div className="d-flex flex-column">
        <label className="form-label h5 m-0" htmlFor={fieldId}>
          {label}
        </label>
        {description && <small className="text-muted">{description}</small>}
        <div
          className={classNames(
            'input-wrapper d-flex justify-content-center align-items-center position-relative mt-2 p-5 rounded bg-light',
            isDragOver && 'isDragOver'
          )}
        >
          <input
            accept="image/*"
            className="w-100 h-100 opacity-0 position-absolute left-0 top-0"
            type="file"
            id={fieldId}
            {...inputProps}
            onDragEnter={() => setDragOver(true)}
            onDragExit={() => setDragOver(false)}
            onChange={(e) => {
              const uploads = e.target.files;

              setFiles(Array.from(uploads || []));
            }}
          />
          <div className="d-flex flex-column align-items-center">
            <FontAwesomeIcon
              className="icon mb-2"
              size="2x"
              icon={faFileUpload}
            />
            <span>Klik of sleep om media te uploaden.</span>
          </div>
        </div>
      </div>
      {showPreview && files.length > 0 && (
        <div className="bg-light p-3">
          <p className="text-muted">
            Deze afbeelding worden aan je Expo toegevoegd zodra je opslaat.
          </p>
          <UploadPreview files={files} onDelete={deletePreview} />
        </div>
      )}
    </div>
  );
}
