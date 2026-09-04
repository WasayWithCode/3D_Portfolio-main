import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to (0,0) on route change UNLESS the new location has a hash
 * (e.g. /#about — those are handled by the HomePage useEffect).
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Don't scroll to top if navigating within the same page via hash
    if (hash) { prevPathname.current = pathname; return; }
    // Don't scroll if only the hash changed on the same pathname
    if (prevPathname.current === pathname) { prevPathname.current = pathname; return; }
    prevPathname.current = pathname;

    const id = requestAnimationFrame(() =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    );
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
