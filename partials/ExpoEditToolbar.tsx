import Link from 'next/link';
import { Expo } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faSave } from '@fortawesome/free-solid-svg-icons';
import { use } from 'react';
import { Category } from '@prisma/client';

interface IExpoEditToolbarProps {
  expo: Expo;
  expoStatus: 'loading' | 'pristine' | 'edited' | 'error';
}

export default function ExpoEditToolbar({
  expo,
  expoStatus,
}: IExpoEditToolbarProps) {
  const categories = use(getCategories());

  return (
    <div className="expo-edit-toolbar row d-flex align-items-center bg-light rounded p-2">
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
            <option value={'draft'}>Concept </option>
            <option value={'published'}>Gepubliceerd</option>
          </select>
        </label>
        <label className="d-flex align-items-center m-0">
          <span className="me-2">Categorie</span>
          <select name="category" className="form-select">
            <option value="">Geen</option>
            {categories.map((category, i) => (
              <option key={i} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <button
          disabled={expoStatus !== 'pristine'}
          type="submit"
          className="btn btn-primary"
        >
          <FontAwesomeIcon
            icon={expoStatus === 'error' ? faCross : faSave}
            className="me-2"
          />
          Opslaan
        </button>
      </div>
    </div>
  );
}

async function getCategories() {
  const res = await fetch('http://localhost:3000/api/category/all');
  const categories: Promise<Category[]> = await res.json();

  return categories;
}
