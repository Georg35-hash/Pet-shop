import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AnimationProvider({ children, threshold = 0.1 }) {
  const location = useLocation();

  useEffect(() => {
    const elements = document.querySelectorAll(".hidden");

    console.log("🔍 Elements found:", elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible"); // 🔥
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

  return <>{children}</>;
}
