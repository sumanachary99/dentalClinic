import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_SEO, SITE_URL, buildClinicSchema } from '../utils/seo';

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, name] = selector.match(/\[(?:name|property)="([^"]+)"\]/) || [];
    el.setAttribute(selector.includes('property=') ? 'property' : 'name', name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * Keeps the document title, description, canonical URL and social cards in
 * step with the current route. This is a hash-router single-page app, so
 * nothing else updates them — without this every page reports the home
 * page's title to search engines and link previews.
 */
export default function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = PAGE_SEO[pathname] || PAGE_SEO['/'];
    const url = pathname === '/' ? SITE_URL : `${SITE_URL}#${pathname}`;

    document.title = seo.title;
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', seo.title);
    setMeta('meta[name="twitter:description"]', 'content', seo.description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);

  // The clinic schema is route-independent, so write it once.
  useEffect(() => {
    const id = 'clinic-schema';
    if (document.getElementById(id)) return undefined;
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(buildClinicSchema());
    document.head.appendChild(script);
    return undefined;
  }, []);

  return null;
}
