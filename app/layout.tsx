import '../scss/style.scss';
import Admin from 'partials/Admin';
import AuthContext from 'components/AuthContext';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { Session } from 'next-auth/core/types';

config.autoAddCss = false; /* eslint-disable import/first */
import { headers, cookies } from 'next/headers';

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch('http://localhost:3000/api/auth/session', {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function DefaultLayout({ children }: any) {
  const session = await getSession(headers().get('cookie') ?? '');

  return (
    <html lang="nl">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Expo</title>
      </head>
      <body className="vh-100">
        <AuthContext session={session}>
          <Admin />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
