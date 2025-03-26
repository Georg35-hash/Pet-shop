import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AnimationProvider({ children, threshold = 0.02 }) {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true); // Устанавливаем флаг, когда компоненты загружены

    const elements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver(
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

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [location.pathname, threshold]);

  return <>{loaded && children}</>;
}
