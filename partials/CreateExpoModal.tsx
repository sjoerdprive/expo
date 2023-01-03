import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ExpoCreateForm from './ExpoCreateForm';

export default function CreateExpoModal() {
  return (
    <>
      <Modal
        modalId="create-expo-modal"
        btnClass="btn btn-primary w-100"
        btnText={
          <>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>Nieuwe Expo</span>
          </>
        }
        title="Nieuwe Expo"
      >
        <div>
          <ExpoCreateForm />
        </div>
      </Modal>
    </>
  );
}
