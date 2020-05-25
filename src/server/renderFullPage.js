import serialize from 'serialize-javascript';

export default function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Mercado Libre Argentina</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
        />
        ${process.env.NODE_ENV === 'production' ? '<link rel="stylesheet" type="text/css" href="/dist/main.style.css" />' : ''}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })}
        </script>
        <script src="/dist/main.bundle.js"></script>
      </body>
    </html>
    `;
}
