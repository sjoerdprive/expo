'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { Expo } from '@prisma/client';

interface IExpoDrawerItemProps {
  expo: Expo;
}

export default function ExpoDrawerItem({ expo }: IExpoDrawerItemProps) {
  const pathname = usePathname();
  const isCurrentExpo = pathname?.includes(expo.id);

  return (
    <li
      className={classNames(
        isCurrentExpo ? 'bg-light' : 'bg-gray',
        'list-group-item'
      )}
    >
      <Link
        className={classNames('link-dark', 'p-1', 'text-decoration-none')}
        aria-current={isCurrentExpo ? 'page' : false}
        href={'/dashboard/expos/edit/' + expo.id}
      >
        {expo.title}
      </Link>
    </li>
  );
}
