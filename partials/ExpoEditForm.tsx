
import ExpoEditField from 'components/ExpoEditField';
import ExpoEditToolbar from 'partials/ExpoEditToolbar';
import { Expo } from '@prisma/client';

interface IExpoEditForm {
  expo: Expo;
}

export default function ExpoEditForm({ expo }: IExpoEditForm) {
  return (
    <form action="">
      <div className="mb-5">
        <ExpoEditToolbar expo={expo} />
      </div>
      <ExpoEditField
        description="De titel van je Expo. Deze is bovenaan de pagina te zien."
        name="title"
        label="Titel"
        value={expo.title}
      />
      <label className="form-label w-100 d-flex flex-column mb-4">
        <span className="h5 m-0">Blurb</span>
        <small className="text-muted">
          Een (korte) beschrijving van jouw Expo. Denk aan de tekst achterop een
          boek.
        </small>
        <textarea className="form-control w-100 mt-2" name="blurb">
          {expo.blurb}
        </textarea>
      </label>
    </form>
  );
}
