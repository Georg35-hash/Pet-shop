import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AnimationProvider({ children, threshold = 0.02 }) {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    const observerConfig = { childList: true, subtree: true };
    const domObserver = new MutationObserver(() => {
      initAnimations();
    });

    domObserver.observe(document.body, observerConfig);
    initAnimations();

    return () => domObserver.disconnect();
  }, [location.pathname, threshold]);

  function initAnimations() {
    const elements = document.querySelectorAll(".hidden");
    if (elements.length === 0) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold }
    );

    elements.forEach((el) => intersectionObserver.observe(el));

    return () => {
      elements.forEach((el) => intersectionObserver.unobserve(el));
    };
  }

  return <>{loaded && children}</>;
}
