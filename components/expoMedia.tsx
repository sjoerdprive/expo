'use client';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from '@prisma/client';
import classNames from 'classnames';

interface IExpoMediaProps {
  image: Image;
  isSelected: boolean;
  isSetForRemove: boolean;
  select: () => void;
  deSelect: () => void;
}

export default function ExpoMedia({
  image,
  isSelected,
  isSetForRemove,
  select,
  deSelect,
}: IExpoMediaProps) {
  return (
    <button
      aria-selected={isSelected}
      type="button"
      className={classNames(
        'expo-media border-0 p-0 w-100 position-relative',
        isSelected && 'selected',
        isSetForRemove && 'setForRemove'
      )}
      onClick={() => {
        isSelected ? deSelect() : select();
        // return console.log('click');
      }}
    >
      <span className="bg-secondary indicator"></span>
      {isSetForRemove && (
        <div className="d-flex justify-content-center align-items-center position-absolute top-0 left-0 w-100 h-100">
          <span className="bg-warning p-2 text-white">
            <FontAwesomeIcon className="me-2" icon={faTrashCan} /> Gemarkeerd
            voor verwijderen
          </span>
        </div>
      )}

      <figure className="m-0">
        <img
          style={{ objectFit: 'cover' }}
          alt=""
          className={classNames('w-100 h-100')}
          src={image.src}
        />
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>
    </button>
  );
}
