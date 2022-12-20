import { Expo } from '@prisma/client';
import Link from 'next/link';

interface IExpoNavProps {
  expos: Expo[];
}

export default function ExpoNav({ expos }: IExpoNavProps) {
  return (
    <nav>
      <ul className="list-unstyled">
        {expos.map((expo, i) => (
          <li key={i}>
            <Link href={expo.slug}>{expo.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
