import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Expo } from '@prisma/client';
import ExpoDrawerItem from 'components/ExpoDrawerItem';
import Link from 'next/link';

interface IExpoNavProps {
  expos: Expo[];
}

export default function ExpoDrawer({ expos }: IExpoNavProps) {
  console.log(expos);
  return (
    <nav className="h-100 expo-nav">
      <ul className="d-flex flex-column justify-content-between h-100 list-group">
        <div role="presentation">
          {expos.map((expo, i) => {
            return <ExpoDrawerItem key={i} expo={expo} />;
          })}
        </div>
        <li className='w-100'>
          <Link href={'/dashboard/expos/create'} className="btn btn-primary w-100">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Nieuwe Expo
          </Link>
        </li>
      </ul>
    </nav>
  );
}
