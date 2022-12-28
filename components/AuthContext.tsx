'use client';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth/core/types';

interface IAuthContextProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function AuthContext({ children, session }: IAuthContextProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
