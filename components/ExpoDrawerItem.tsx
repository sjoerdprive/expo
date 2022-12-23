'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { Expo } from '@prisma/client';
import { Category } from '@prisma/client';

interface IExpoDrawerItemProps {
  expo: Expo & { category: Category | null };
  showCategory?: boolean;
}

export default function ExpoDrawerItem({
  expo,
  showCategory,
}: IExpoDrawerItemProps) {
  const pathname = usePathname();
  const isCurrentExpo = pathname?.includes(expo.id);

  return (
    <li
      className={classNames(
        isCurrentExpo ? 'bg-light' : 'bg-gray',
        'list-group-item'
      )}
    >
      {showCategory && (
        <small className="d-block tiny">Categorie: {expo.category?.name}</small>
      )}
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
