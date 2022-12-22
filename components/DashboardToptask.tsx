import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IDashboardToptaskProps {
  href: string;
  label: string;
  icon?: IconProp;
  children?: string | React.ReactNode;
}

export default function DashboardToptask({
  href,
  label,
  icon,
  children,
}: IDashboardToptaskProps) {
  return (
    <div className="card p-3 shadow">
      <div className="card-body">
        <h2 className="card-title d-flex">
          <Link className='text-dark text-decoration-none' href={href}>{label}</Link>
          {icon && (
            <FontAwesomeIcon className="ms-auto text-secondary" icon={icon} />
          )}
        </h2>
        {typeof children === 'string' ? (
          <p className="card-text lead">{children}</p>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
