import { Expo, Image } from '@prisma/client';

interface IExpoMediaEditorProps {
  expo?: Expo & { images: Image[] };
  images?: Image[];
}

export default function ExpoMediaEditor({
  expo,
  images = [],
}: IExpoMediaEditorProps) {
  return (
    <div className="p-2">
      <ul className="list-unstyled row g-3">
        {images?.map((image, i) => (
          <li key={i} className="col-12 col-lg-6 col-xxl-4 overflow-hidden">
            <figure>
              <img
                style={{ objectFit: 'cover' }}
                alt=""
                className="w-100 h-100"
                src={image.src}
              />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
