'use client';
import { faGears, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Expo, Category } from '@prisma/client';
import ExpoDrawerItem from 'components/ExpoDrawerItem';
import Link from 'next/link';
import { useState } from 'react';
import CreateExpoModal from './CreateExpoModal';
import Modal from './Modal';

interface IExpoNavProps {
  expos: (Expo & { category: Category | null })[];
}

export default function ExpoDrawer({ expos }: IExpoNavProps) {
  const [showCategory, setShowCategory] = useState(false);
  return (
    <>
      <fieldset className="bg-light">
        <details className="px-4 py-2">
          <summary>
            Opties <FontAwesomeIcon className="me-2" icon={faGears} />
          </summary>
          <div className="py-2">
            <div className="form-check">
              <label className="form-check-label">
                Toon categorie
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={showCategory}
                  onChange={(e) => setShowCategory(e.currentTarget.checked)}
                />
              </label>
            </div>
          </div>
        </details>
      </fieldset>
      <nav className="h-100 expo-nav">
        <ul className="d-flex flex-column justify-content-between h-100 list-group">
          <div role="presentation">
            {expos.map((expo, i) => {
              return (
                <ExpoDrawerItem
                  key={i}
                  expo={expo}
                  showCategory={showCategory}
                />
              );
            })}
          </div>
          <li className="w-100">
            <CreateExpoModal />
          </li>
        </ul>
      </nav>
    </>
  );
}
