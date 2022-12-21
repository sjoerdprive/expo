'use client';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Expo } from '@prisma/client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IExpoNavProps {
  expos: Expo[];
}

export default function ExpoNav({ expos }: IExpoNavProps) {
  const pathname = usePathname();
  return (
    <nav className="h-100 expo-nav">
      <ul className="list-unstyled d-flex flex-column justify-content-between h-100">
        <div role="presentation">
          <li className="mb-2">
            <Link className={classNames('link-dark')} href={'/'}>
              Voorpagina
            </Link>
          </li>
          {expos.map((expo, i) => {
            const isCurrentExpo = pathname?.includes(expo.slug);

            console.log(
              `${pathname} does ${!isCurrentExpo ? 'not' : ''} include ${
                expo.slug
              }`
            );
            return (
              <li key={i} className="mb-2">
                <Link
                  className={classNames(
                    'link-dark',
                    isCurrentExpo && 'bg-primary'
                  )}
                  aria-current={isCurrentExpo ? 'page' : false}
                  href={expo.slug}
                >
                  {expo.title}
                </Link>
              </li>
            );
          })}
        </div>
        <li>
          <Link href={'/dashboard'}>
            <FontAwesomeIcon icon={faDashboard} className="me-1" />
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}
