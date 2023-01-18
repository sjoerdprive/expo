import '../scss/style.scss';
import Admin from 'partials/Admin';
import AuthContext from 'components/AuthContext';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { Session } from 'next-auth/core/types';

config.autoAddCss = false; /* eslint-disable import/first */
import { headers, cookies } from 'next/headers';
import { authOptions } from '#/pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import { prisma } from '#/prisma';
import RootStyler from 'components/RootStyler';

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch('http://localhost:3000/api/auth/session', {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function DefaultLayout({ children, params }: any) {
  // const session = await getSession(headers().get('cookie') ?? '');
  const session = await unstable_getServerSession(authOptions);

  const expo = params.slug ? await getExpo(params.slug) : undefined;
  const settings = await getGlobalSettings();

  return (
    <html lang="nl">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        ></script>
        {/* <RootStyler settings={settings} /> */}
        <title>
          {expo ? `${settings?.siteName} | ${expo.title}` : settings?.siteName}
        </title>
      </head>
      <body className="vh-100">
        <AuthContext session={session}>
          <Admin expoId={expo?.id} />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}

async function getExpo(slug: string) {
  const expo = await prisma.expo.findFirst({ where: { slug: slug } });

  return expo;
}

async function getGlobalSettings() {
  const settings = await prisma.settings.findFirst({});

  return settings;
}
