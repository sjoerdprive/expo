import { Expo } from '@prisma/client';
import { prisma } from '#/prisma';
import ExpoDrawer from 'partials/ExpoDrawer';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

interface IExpoDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function ExpoDashboardLayout({
  children,
}: IExpoDashboardLayoutProps) {
  const expos = await getExpos();

  return (
    <div className="dashboard-expos-layout">
      <aside className="d-flex flex-column shadow">
        <ExpoDrawer expos={expos} />
      </aside>
      <main>{children}</main>
    </div>
  );
}

async function getExpos() {
  const expos: Expo[] = await prisma.expo.findMany();

  return expos;
}
