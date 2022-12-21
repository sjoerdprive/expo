'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
  const { data: session, status } = useSession({ required: true });

  if (status === 'loading') return <p>Laden...</p>;

  if (status === 'authenticated') return <>{children}</>;

  return (
    <p>
      Geen toegang. <Link href={'/api/auth/signin/credentials'}>Log in</Link> of
      ga terug naar <Link href={'/'}>homepage</Link>
    </p>
  );
}
