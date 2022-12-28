'use client';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IUploadPreviewProps {
  files?: File[];
  onDelete?: any;
}

export default function UploadPreview({
  files,
  onDelete,
}: IUploadPreviewProps) {
  if (!files) return <></>;
  return (
    <div className="">
      <ul className="list-unstyled row g-3">
        {files.map((file, i) => {
          const src = URL.createObjectURL(file);
          return (
            <li
              className="position-relative col-12 col-lg-6 col-xxl-4 overflow-hidden"
              key={i}
            >
              <button
                onClick={() => {
                  onDelete(file);
                }}
                className="position-absolute top-0 right-0 p-1 btn btn-light"
              >
                <FontAwesomeIcon icon={faCircleXmark} />
                <span className="visually-hidden">Verwijder afbeelding</span>
              </button>
              <img
                className="w-100"
                style={{ objectFit: 'cover' }}
                src={src}
                alt=""
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
