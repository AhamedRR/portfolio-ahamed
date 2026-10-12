import { useEffect, useState } from "react";

/**
 * Tracks which page section is currently in view while scrolling,
 * so the navbar can highlight the active link.
 */
export function useActiveSection(ids: readonly string[], offset = 160): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const scrollPosition = window.scrollY + offset;
      let current = ids[0] ?? "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          current = id;
        }
      }

      // Snap to the last section when the page bottom is reached
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        current = ids[ids.length - 1] ?? current;
      }

      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(","), offset]);

  return active;
}
