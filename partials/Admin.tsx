'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDashboard } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

export default function Admin() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isOnDashboard = pathname?.match('/dashboard');

  if (status === 'authenticated')
    return (
      <header className="bg-secondary">
        <div className="container-fluid">
          {isOnDashboard ? (
            <Link href={'/'}>
              <FontAwesomeIcon icon={faHome} className="me-1" />
              Naar voorkant
            </Link>
          ) : (
            <Link href={'/dashboard'}>
              <FontAwesomeIcon icon={faDashboard} className="me-1" />
              Naar dashboard
            </Link>
          )}

          <button className="btn btn-light" onClick={() => signOut()}>
            Log uit
          </button>
        </div>
      </header>
    );

  return <></>;
}
