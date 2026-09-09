import { lazy } from 'react';

const RELOAD_FLAG = 'chunk-reload-attempted';

function readFlag() {
  try {
    return sessionStorage.getItem(RELOAD_FLAG) === '1';
  } catch {
    return false;
  }
}

function writeFlag(value) {
  try {
    if (value) sessionStorage.setItem(RELOAD_FLAG, '1');
    else sessionStorage.removeItem(RELOAD_FLAG);
  } catch {
    /* storage unavailable — worst case we skip the retry */
  }
}

/**
 * Every deploy gives the route chunks new hashed filenames and removes the
 * old ones, so a tab that was opened before the deploy asks for a file the
 * server no longer has. The import then rejects and takes the whole app
 * down with it. Reloading pulls a fresh index.html with the current
 * filenames, which is invisible to the visitor.
 *
 * The flag is what stops that from looping: it survives the reload, and is
 * only cleared once a chunk actually loads, so a genuinely missing chunk
 * gets exactly one retry before the error boundary takes over.
 */
export function lazyWithReload(importer) {
  return lazy(() =>
    importer()
      .then((module) => {
        writeFlag(false);
        return module;
      })
      .catch((error) => {
        if (readFlag()) throw error;
        writeFlag(true);
        window.location.reload();
        // Keep Suspense pending; the reload replaces this document.
        return new Promise(() => {});
      })
  );
}
