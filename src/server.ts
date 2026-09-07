import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');
const app = express();
const commonEngine = new CommonEngine();

app.use(express.static(browserDistFolder, { maxAge: '1y', index: false }));
app.get('*', (request, response, next) => {
  commonEngine.render({
    bootstrap,
    documentFilePath: indexHtml,
    url: `${request.protocol}://${request.get('host')}${request.originalUrl}`,
    publicPath: browserDistFolder,
    providers: [{ provide: APP_BASE_HREF, useValue: request.baseUrl }]
  }).then(html => response.send(html)).catch(next);
});

const port = process.env['PORT'] || 4000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));