'use client';
import { Image } from '@prisma/client';
import classNames from 'classnames';

interface IExpoMediaProps {
  image: Image;
  isSelected: boolean;
  select: () => void;
  deSelect: () => void;
}

export default function ExpoMedia({
  image,
  isSelected,
  select,
  deSelect,
}: IExpoMediaProps) {
  return (
    <button
      aria-pressed={isSelected}
      className={classNames(
        'expo-media border-0 p-0 w-100',
        isSelected && 'selected'
      )}
      onClick={() => {
        isSelected ? deSelect() : select();
        // return console.log('click');
      }}
    >
      <span className="bg-secondary indicator"></span>
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
