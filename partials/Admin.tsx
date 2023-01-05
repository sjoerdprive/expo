'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faDashboard,
  faCaretLeft,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

export default function Admin({ expoId }: any) {
  // const { data: session, status } = useSession()
  const status = 'authenticated';
  const pathname = usePathname();

  const isOnDashboard = pathname?.match('/dashboard');
  const isNestedDashboard = pathname?.match('/dashboard/');
  const isInExpo = !!expoId;

  console.log({ expoId });

  if (status === 'authenticated')
    return (
      <header className="bg-primary">
        <div className="container-fluid">
          <div className="admin-bar d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {isNestedDashboard && (
                <Link
                  className="link-dark p-2 text-decoration-none"
                  href="/dashboard"
                >
                  <FontAwesomeIcon className="me-2" icon={faCaretLeft} />
                  <span className="">Terug naar dashboard</span>
                </Link>
              )}
              {isInExpo && (
                <Link
                  className="link-dark p-2 text-decoration-none"
                  href={'/dashboard/expos/edit/' + expoId}
                >
                  <FontAwesomeIcon className="me-2" icon={faPencil} />
                  <span className="">Bewerk deze Expo</span>
                </Link>
              )}
            </div>
            <div className="d-flex align-items-center">
              {isOnDashboard ? (
                <Link className="link-dark text-decoration-none" href={'/'}>
                  <FontAwesomeIcon icon={faHome} className="me-1" />
                  Naar voorkant
                </Link>
              ) : (
                <Link
                  className="link-dark text-decoration-none"
                  href={'/dashboard'}
                >
                  <FontAwesomeIcon icon={faDashboard} className="me-1" />
                  Naar dashboard
                </Link>
              )}

              <button
                className="btn btn-link link-dark"
                onClick={() => signOut()}
              >
                Log uit
              </button>
            </div>
          </div>
        </div>
      </header>
    );

  return <></>;
}
