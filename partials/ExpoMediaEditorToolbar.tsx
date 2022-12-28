'use client';

import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

interface IExpoMediaEditorToolbarProps {
  open?: boolean;
}

export default function ExpoMediaEditorToolbar({
  open,
}: IExpoMediaEditorToolbarProps) {
  return (
    <div className={'expo-media-editor-toolbar'}>
      <div
        className={classNames(
          'toolbar d-flex align-items-center bg-secondary text-white rounded-top',
          open ? 'open' : 'closed'
        )}
      >
        <div className="button-wrapper">
          <button className="btn btn-link text-white text-decoration-none">
            <FontAwesomeIcon icon={faTrashCan} className="me-2" />
            Verwijder media
          </button>
          <button className="btn btn-link text-white text-decoration-none">
            <FontAwesomeIcon icon={faPencil} className="me-2" />
            Bewerk media
          </button>
        </div>
      </div>
    </div>
  );
}
