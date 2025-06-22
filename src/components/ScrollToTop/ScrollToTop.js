// ScrollToTopButton.jsx
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show / hide button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // appear after ~300 px of scrolling
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth-scroll to the very top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Style: fixed to bottom-right of the viewport
  const buttonStyle = {
    position: "fixed",
    right: "1.5rem",
    bottom: "1.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "50%",
    border: "none",
    fontSize: "1.25rem",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    background: "linear-gradient(135deg, #D87D4A 0%, #D87D4A 100%)",
    color: "#fff",
    transition: "opacity 0.25s ease",
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? "auto" : "none",
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      style={buttonStyle}
    >
      ↑
    </button>
  );
}
