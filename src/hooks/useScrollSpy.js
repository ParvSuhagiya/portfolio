import { useEffect, useRef } from 'react';

/**
 * Watches a list of section IDs with IntersectionObserver.
 * When a section enters view it:
 *  - Updates document.title with a section-specific title
 *  - Updates the URL path (/section-id) without pushing to history
 *
 * @param {Array<{id: string, title: string, hash: string}>} sections
 */
export function useScrollSpy(sections) {
  const activeRef = useRef(null);

  useEffect(() => {
    if (!sections?.length) return;

    const observers = [];

    sections.forEach(({ id, title }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (activeRef.current === id) return; // no duplicate updates
            activeRef.current = id;

            // Update page title
            document.title = title;

            // Update URL path silently — no hash, no history push
            // 'home' section → '/', all others → '/section-id'
            const path = id === 'home' ? '/' : `/${id}`;
            window.history.replaceState(null, '', path);
          }
        },
        {
          threshold: 0.35,
          rootMargin: '-80px 0px -20% 0px',
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);
}
