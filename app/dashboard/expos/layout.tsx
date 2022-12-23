import { Expo } from '@prisma/client';
import { prisma } from '#/prisma';
import ExpoDrawer from 'partials/ExpoDrawer';

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
      <main className="h-100 overflow-auto">{children}</main>
    </div>
  );
}

async function getExpos() {
  const expos = await prisma.expo.findMany({
    include: { category: true },
  });

  return expos;
}
