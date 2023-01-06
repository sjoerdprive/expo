'use client';
import { Expo, Image } from '@prisma/client';
import ExpoMedia from 'components/ExpoMedia';
import { useEffect, useState } from 'react';
import ExpoMediaEditorToolbar from './ExpoMediaEditorToolbar';

interface IExpoMediaEditorProps {
  expo?: Expo & { images: Image[] };
  images?: Image[];
}

export default function ExpoMediaEditor({
  expo,
  images,
}: IExpoMediaEditorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [idsToRemove, setIdsToRemove] = useState<string[]>([]);

  const selectedImages =
    images?.filter((img) => selectedIds.includes(img.id)) || [];

  useEffect(() => {
    setSelectedIds([]);
    setIdsToRemove([]);
  }, [images]);

  const hasSelections = selectedIds.length > 0;
  const hasMarkedIdsInSelection = selectedIds.some((val) =>
    idsToRemove.includes(val)
  );
  const isAllSelectionsMarked = selectedIds.every((val) =>
    idsToRemove.includes(val)
  );

  return (
    <div className="expo-media-editor position-relative">
      <input
        type="hidden"
        name="fileIdsToRemove"
        value={idsToRemove.length > 0 ? idsToRemove.join(';') : []}
      />
      <ExpoMediaEditorToolbar
        className="mb-2"
        selectedMedia={selectedImages}
        setForRemove={() => {
          setIdsToRemove((prev) => prev.concat(selectedIds));
          setSelectedIds([]);
        }}
        unsetForRemove={() => {
          setIdsToRemove((prev) => {
            return prev.filter((val) => !selectedIds.includes(val));
          });
          setSelectedIds([]);
        }}
        open={hasSelections}
        showSetButton={!isAllSelectionsMarked}
        showUnsetButton={hasMarkedIdsInSelection}
      />
      {idsToRemove.length > 0 && (
        <p>
          Gemarkeerde afbeeldingen worden verwijderd wanneer je je Expo opslaat.
        </p>
      )}
      <ul className="list-unstyled row g-3" aria-multiselectable="true">
        {images ? (
          images.map((image, i) => {
            const isSelected = selectedIds.includes(image.id);
            const isSetForRemove = idsToRemove.includes(image.id);
            return (
              <li
                key={image.id}
                className="col-12 col-lg-6 col-xxl-4 overflow-hidden"
              >
                <ExpoMedia
                  isSelected={isSelected}
                  isSetForRemove={isSetForRemove}
                  image={image}
                  select={() => {
                    console.log('select');
                    setSelectedIds((prev: any) => prev.concat(image.id));
                  }}
                  deSelect={() => {
                    console.log('deselect');
                    setSelectedIds((prev: any) =>
                      prev.filter((index: any) => index !== image.id)
                    );
                  }}
                />
              </li>
            );
          })
        ) : (
          <p>
            Deze Expo bevat nog geen media. Klik of sleep op het invoerveld om
            bestanden te uploaden.
          </p>
        )}
      </ul>
    </div>
  );
}
