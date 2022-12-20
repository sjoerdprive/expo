import '../scss/style.scss';

export default function DefaultLayout({ children }: any) {
  return (
    <html lang="nl">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Expo</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
