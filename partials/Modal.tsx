'use client';
import { useId } from 'react';
import { v4 as uuid } from 'uuid';

interface IModalProps {
  children?: React.ReactNode;
  title: string;
  modalId: string;
  btnText: React.ReactNode;
  btnClass?: string;
}

export default function Modal({
  children,
  title,
  btnText,
  btnClass,
  modalId,
}: IModalProps) {
  const labelId = useId();

  return (
    <>
      <button
        type="button"
        className={btnClass}
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        {btnText}
      </button>
      <div className="modal fade" id={modalId}>
        <div className="modal-dialog" role="dialog" aria-labelledby={labelId}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={labelId}>
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              >
                <span className="visually-hidden">Sluit</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-gray"
                data-bs-dismiss="modal"
              >
                Sluit
              </button>
              <button type="button" className="btn btn-primary">
                Bevestig
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
