'use client';
import Link from 'next/link';
import { Expo } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faWarning, faEye } from '@fortawesome/free-solid-svg-icons';
import { use, useId, useRef, useEffect, useState } from 'react';
import { Category } from '@prisma/client';
import classNames from 'classnames';
import { ExpoStatus } from './ExpoEditForm';
import DeleteExpoModal from './DeleteExpoModal';
import Select from 'components/Select';

interface IExpoEditToolbarProps {
  expo: Expo;
  expoStatus: ExpoStatus;
  className?: string;
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
  className,
}: IExpoEditToolbarProps) {
  const categories = use(getCategories());
  const statusId = useId();

  // useEffect(() => {
  //   if (!toolbar.current) return;

  //   const io = new IntersectionObserver(
  //     ([entry], observer) => {
  //       setSticky(entry.isIntersecting);
  //     },
  //     { rootMargin: '2rem' }
  //   );

  //   io.observe(toolbar.current);

  //   return () => {
  //     io.disconnect();
  //   };
  // }, [toolbar]);

  return (
    <div className={classNames('expo-edit-toolbar bg-white', className)}>
      <div className="bg-light rounded row d-flex align-items-center p-2">
        <div className="col-auto d-flex align-items-center gap-3">
          <button
            type="submit"
            className="btn btn-primary"
            aria-describedby={statusId}
          >
            <FontAwesomeIcon
              icon={expoStatus === 'error' ? faWarning : faSave}
            />
            <span className="button-label">Opslaan</span>
          </button>
          <DeleteExpoModal expo={expo} />
          <Link className="btn btn-link link-dark" href={`/${expo.slug}`}>
            <FontAwesomeIcon icon={faEye} />
            <span className="button-label">Bekijk</span>
          </Link>
        </div>
        <div className="col"></div>
        <div className="col-auto d-flex align-items-center gap-3 flex-wrap">
          <Select
            name="status"
            label="Status"
            opts={[
              { label: 'Concept', value: 'draft' },
              { label: 'Gepubliceerd', value: 'published' },
            ]}
          />
          <Select
            name="category"
            label="Categorie"
            opts={categories.map((category, i) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
      </div>
      <div className="p-2 d-flex justify-content-start">
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
