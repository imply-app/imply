// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg" />

          <title>Imply | All-in-one team platform</title>
          <meta name="description" content="All-in-one team platform" />

          <meta
            property="og:title"
            content="Imply | All-in-one team platform"
          />
          <meta property="og:description" content="All-in-one team platform" />
          <meta property="og:image" content="https://imply.app/og.png" />
          <meta property="og:image:alt" content="All-in-one team platform" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />
          <meta property="og:site_name" content="Imply" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://imply.app" />
          <meta
            property="og:image:secure_url"
            content="https://imply.app/og.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:locale" content="en_US" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Imply | All-in-one team platform"
          />
          <meta name="twitter:description" content="All-in-one team platform" />
          <meta name="twitter:image" content="https://imply.app/og.png" />
          <meta name="twitter:image:alt" content="All-in-one team platform" />
          <meta name="twitter:site" content="@tri2820" />
          <meta name="twitter:creator" content="@tri2820" />

          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
