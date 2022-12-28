'use client';
import { Expo, Image } from '@prisma/client';
import ExpoMedia from 'components/expoMedia';
import { useState } from 'react';
import ExpoMediaEditorToolbar from './ExpoMediaEditorToolbar';

interface IExpoMediaEditorProps {
  expo?: Expo & { images: Image[] };
  images?: Image[];
}

export default function ExpoMediaEditor({
  expo,
  images = [],
}: IExpoMediaEditorProps) {
  const [selectedIndeces, setSelectedIndeces] = useState<number[]>([]);

  const hasSelections = selectedIndeces.length > 0;

  return (
    <div className="expo-media-editor">
      <div className="mb-2">
        <ExpoMediaEditorToolbar open={hasSelections} />
      </div>
      <ul className="list-unstyled row g-3">
        {images?.map((image, i) => {
          const isSelected = selectedIndeces.includes(i);
          return (
            <li key={i} className="col-12 col-lg-6 col-xxl-4 overflow-hidden">
              <ExpoMedia
                isSelected={isSelected}
                image={image}
                select={() => {
                  console.log('select');
                  setSelectedIndeces((prev: any) => prev.concat(i));
                }}
                deSelect={() => {
                  console.log('deselect');
                  setSelectedIndeces((prev: any) =>
                    prev.filter((index: any) => index !== i)
                  );
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
