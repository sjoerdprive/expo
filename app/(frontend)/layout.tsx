import ExpoNav from 'partials/ExpoNav';
import { prisma } from '#/prisma';
import { Expo } from '@prisma/client';
import { ReactNode } from 'react';

async function getExpos() {
  const expos: Expo[] = await prisma.expo.findMany();

  return expos;
}

interface IFrontendLayoutProps {
  children: ReactNode;
}

export default async function FrontendLayout({
  children,
}: IFrontendLayoutProps) {
  const expos = await getExpos();

  return (
    <div className="frontend-layout">
      <aside className="p-3">
        <ExpoNav expos={expos} />
      </aside>
      <main className="p-3">{children}</main>
    </div>
  );
}
