'use client';
import Link from 'next/link';
import { Expo } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface IExpoEditToolbarProps {
  expo: Expo;
}

export default function ExpoEditToolbar({ expo }: IExpoEditToolbarProps) {
  return (
    <div className="expo-edit-toolbar row d-flex align-items-center bg-light rounded p-2">
      <div className="col-auto d-flex align-items-center">
        <Link className="btn btn-link link-dark" href={`/${expo.slug}`}>
          Bekijk
        </Link>
      </div>
      <div className="col"></div>
      <div className="col-auto d-flex align-items-center gap-3 flex-wrap">
        <label className="d-flex align-items-center m-0">
          <span className="me-2">Status</span>
          <select className="form-select">
            <option>Draft</option>
            <option>Gepubliceerd</option>
          </select>
        </label>
        <label className="d-flex align-items-center m-0">
          <span className="me-2">Categorie</span>
          <select className="form-select">
            <option>Experiment</option>
            <option>Commissie</option>
          </select>
        </label>
        <button className="btn btn-primary">
          <FontAwesomeIcon icon={faSave} className="me-2" />
          Opslaan
        </button>
      </div>
    </div>
  );
}
