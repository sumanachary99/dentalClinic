import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does not reset scroll on navigation, so moving from halfway
 * down the home page to /about used to land you halfway down /about.
 *
 * Two details make this actually land at the top rather than near it:
 *  - the global `scroll-behavior: smooth` is suspended for the jump, or the
 *    browser animates a long scroll and we measure it mid-flight;
 *  - routes are lazy, so the Suspense fallback is what is mounted when the
 *    first scroll fires. The real page swaps in a frame later and can nudge
 *    the offset, so the position is re-asserted on the next two frames.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    const toTop = () => window.scrollTo(0, 0);
    toTop();

    // Re-assert once the lazily-loaded route has actually painted.
    const first = requestAnimationFrame(() => {
      toTop();
      const second = requestAnimationFrame(() => {
        toTop();
        root.style.scrollBehavior = previousBehavior;
      });
      frames.push(second);
    });
    const frames = [first];

    return () => {
      frames.forEach(cancelAnimationFrame);
      root.style.scrollBehavior = previousBehavior;
    };
  }, [pathname]);

  return null;
}
