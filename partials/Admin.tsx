'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faDashboard,
  faCaretLeft,
  faPencil,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

export default function Admin({ expoId }: any) {
  // const { data: session, status } = useSession()
  const status = 'authenticated';
  const pathname = usePathname();

  const isOnDashboard = pathname?.match('/dashboard');
  const isNestedDashboard = pathname?.match('/dashboard/');
  const isInExpo = !!expoId;

  if (status === 'authenticated')
    return (
      <header className="bg-primary">
        <div className="container-fluid">
          <div className="admin-bar d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              {isNestedDashboard && (
                <Link
                  className="btn btn-link link-dark p-2 text-decoration-none"
                  href="/dashboard"
                >
                  <FontAwesomeIcon icon={faCaretLeft} />
                  <span className="button-label">Terug naar dashboard</span>
                </Link>
              )}
              {isInExpo && (
                <Link
                  className="btn btn-link link-dark p-2 text-decoration-none"
                  href={'/dashboard/expos/edit/' + expoId}
                >
                  <FontAwesomeIcon icon={faPencil} />
                  <span className="button-label">Bewerk deze Expo</span>
                </Link>
              )}
            </div>
            <div className="d-flex align-items-center gap-3">
              {isOnDashboard ? (
                <Link
                  className="btn btn-link link-dark text-decoration-none p-2"
                  href={'/'}
                >
                  <FontAwesomeIcon icon={faHome} />
                  <span className="button-label">Naar voorkant</span>
                </Link>
              ) : (
                <Link
                  className="btn btn-link link-dark text-decoration-none  p-2"
                  href={'/dashboard'}
                >
                  <FontAwesomeIcon icon={faDashboard} />
                  <span className="button-label">Naar dashboard</span>
                </Link>
              )}

              <button
                className="btn btn-link link-dark"
                onClick={() => signOut()}
              >
                <FontAwesomeIcon icon={faSignOut} />
                <span className="button-label">Log uit</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );

  return <></>;
}
