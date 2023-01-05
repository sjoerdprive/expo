import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ExpoCreateForm from './ExpoCreateForm';
import { Expo } from '@prisma/client';

interface IDeleteExpoModalProps {
  expo: Expo;
}

export default function DeleteExpoModal({ expo }: IDeleteExpoModalProps) {
  return (
    <>
      <Modal
        btnClass="btn btn-warning text-white"
        modalId="delete-expo-modal"
        btnText={
          <span className="">
            <FontAwesomeIcon icon={faTrashCan} className="me-2" />
            <span>Verwijder Expo</span>
          </span>
        }
        title="Verwijder Expo"
      >
        <div>
          <p>
            Wil je "{expo.title}" permanent verwijderen? Dit kan niet ongedaan
            gemaakt worden!
          </p>
          <button
            type="button"
            className="btn btn-warning text-white me-2"
            data-bs-dismiss="modal"
            onClick={() => deleteExpo(expo.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} className="me-2" />
            <span>Weg ermee!</span>
          </button>
          <button
            type="button"
            data-bs-dismiss="modal"
            className="btn btn-light"
          >
            Annuleren
          </button>
        </div>
      </Modal>
    </>
  );
}

async function deleteExpo(expoId: string) {
  const res = await fetch('/api/expo/delete', {
    method: 'POST',
    body: expoId,
    redirect: 'follow',
  });
}
