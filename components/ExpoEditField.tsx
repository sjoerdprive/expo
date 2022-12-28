'use client';

import classNames from 'classnames';
import { useId, useRef, useState } from 'react';

interface IExpoEditFieldProps {
  name: string;
  label: string;
  type?: string;
  pattern?: string;
  className?: string;
  required?: boolean;
  value?: string;
  description?: string;
  multiple?: boolean;
}

export default function ExpoEditField({
  label,
  value: initValue,
  pattern,
  description,
  className,
  ...inputProps
}: IExpoEditFieldProps) {
  const [errors, setError] = useState<String[]>([]);
  const [value, setValue] = useState(initValue || '');

  const errorId = useId();
  const fieldId = useId();

  const invalid = errors.length > 0;

  return (
    <>
      <div className={classNames('d-flex flex-column', className)}>
        <label className="form-label h5 m-0" htmlFor={fieldId}>
          {label}
        </label>
        {description && <small className="text-muted">{description}</small>}
        {inputProps.type === 'textarea' ? (
          <textarea
            className="form-control mt-2"
            id={fieldId}
            {...inputProps}
            aria-describedby={errorId}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            aria-invalid={invalid}
          ></textarea>
        ) : (
          <input
            className="form-control mt-2"
            id={fieldId}
            {...inputProps}
            aria-describedby={errorId}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            aria-invalid={invalid}
            
          />
        )}
      </div>
      <span id={errorId} className="text-warning">
        {errors.map((error, i) => (
          <span className="d-inline" key={i}>
            {error}
          </span>
        ))}
      </span>
    </>
  );
}

function validate(value: string, match: RegExp) {
  let errors = [];
  const isValueMatch = value.match(match);
  if (isValueMatch) errors.push('Geen geldige invoer');
  return errors;
}
