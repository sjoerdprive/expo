'use client';

import {
  faPencil,
  faTrashCan,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import EditMediaModal from './EditMediaModal';
import { Image } from '@prisma/client';

interface IExpoMediaEditorToolbarProps {
  open?: boolean;
  setForRemove: any;
  unsetForRemove: any;
  showUnsetButton: boolean;
  showSetButton: boolean;
  selectedMedia: Image[];
}

export default function ExpoMediaEditorToolbar({
  open,
  setForRemove,
  unsetForRemove,
  showUnsetButton,
  showSetButton,
  selectedMedia,
}: IExpoMediaEditorToolbarProps) {
  return (
    <div className={'expo-media-editor-toolbar'}>
      <div
        className={classNames(
          'toolbar d-flex align-items-center bg-secondary rounded-top',
          open ? 'open' : 'closed'
        )}
      >
        <div className="button-wrapper">
          <EditMediaModal media={selectedMedia} />
          {showSetButton && (
            <button
              type="button"
              onClick={setForRemove}
              className="btn btn-link text-white text-decoration-none"
            >
              <FontAwesomeIcon icon={faTrashCan} className="me-2" />
              Markeer voor verwijderen
            </button>
          )}
          {showUnsetButton && (
            <button
              type="button"
              onClick={unsetForRemove}
              className="btn btn-link text-white text-decoration-none"
            >
              <FontAwesomeIcon icon={faUndo} className="me-2" />
              Markeren ongedaan maken
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
