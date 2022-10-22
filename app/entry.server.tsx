import { Response } from '@remix-run/node';
import * as Remix from '@remix-run/react';
import isbot from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'stream';

import type { EntryContext, Headers } from '@remix-run/node';

const ABORT_DELAY = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const callbackMethod = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(<Remix.RemixServer context={remixContext} url={request.url} />, {
      [callbackMethod]() {
        let body = new PassThrough();

        responseHeaders.set('Content-Type', 'text/html');

        resolve(
          new Response(body, {
            status: didError ? 500 : responseStatusCode,
            headers: responseHeaders,
          }),
        );
        pipe(body);
      },
      onShellError(err: unknown) {
        reject(err);
      },
      onError(error: unknown) {
        didError = true;

        console.error(error);
      },
    });

    setTimeout(abort, ABORT_DELAY);
  });
}
