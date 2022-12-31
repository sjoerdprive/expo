'use client';
import Link from 'next/link';
import { Expo } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faX, faWarning } from '@fortawesome/free-solid-svg-icons';
import { use, useId } from 'react';
import { Category } from '@prisma/client';
import classNames from 'classnames';
import { ExpoStatus } from './ExpoEditForm';

interface IExpoEditToolbarProps {
  expo: Expo;
  expoStatus: ExpoStatus;
}

enum messages {
  error = 'Er is iets misgegaan tijdens het opslaan',
  pristine = 'Er zijn geen veranderingen om op te slaan',
  loading = '',
  edited = 'Er zijn veranderingen die nog niet zijn opgeslagen',
}

export default function ExpoEditToolbar({
  expo,
  expoStatus,
}: IExpoEditToolbarProps) {
  const categories = use(getCategories());
  const statusId = useId();

  return (
    <div className="expo-edit-toolbar">
      <div className="bg-light rounded row d-flex align-items-center p-2">
        <div className="col-auto d-flex align-items-center">
          <Link className="link-dark" href={`/${expo.slug}`}>
            Bekijk
          </Link>
        </div>
        <div className="col"></div>
        <div className="col-auto d-flex align-items-center gap-3 flex-wrap">
          <label className="d-flex align-items-center m-0">
            <span className="me-2">Status</span>
            <select name="status" className="form-select">
              <option value={'draft'}>Concept</option>
              <option value={'published'}>Gepubliceerd</option>
            </select>
          </label>
          <label className="d-flex align-items-center m-0">
            <span className="me-2">Categorie</span>
            <select name="category" className="form-select">
              {categories.map((category, i) => (
                <option key={i} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="btn btn-primary"
            aria-describedby={statusId}
          >
            <FontAwesomeIcon
              icon={expoStatus === 'error' ? faWarning : faSave}
              className="me-2"
            />
            Opslaan
          </button>
        </div>
      </div>
      <div className="p-2 d-flex justify-content-end">
        <span
          className={classNames(
            expoStatus === 'error' ? 'text-warning' : 'text-muted'
          )}
          id={statusId}
          role="status"
        >
          {messages[expoStatus]}
        </span>
      </div>
    </div>
  );
}

async function getCategories() {
  const res = await fetch('http://localhost:3000/api/category/all');
  const categories: Promise<Category[]> = await res.json();

  return categories;
}
