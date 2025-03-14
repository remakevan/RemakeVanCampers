import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Font Awesome
const fontAwesomeScript = document.createElement('script');
fontAwesomeScript.src = 'https://kit.fontawesome.com/a076d05399.js';
fontAwesomeScript.crossOrigin = 'anonymous';
document.head.appendChild(fontAwesomeScript);

// Add AOS (Animate on Scroll) library
const aosStyles = document.createElement('link');
aosStyles.rel = 'stylesheet';
aosStyles.href = 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css';
document.head.appendChild(aosStyles);

const aosScript = document.createElement('script');
aosScript.src = 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js';
document.body.appendChild(aosScript);

// Initialize AOS after DOM is loaded
aosScript.onload = () => {
  (window as any).AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
  });
};

createRoot(document.getElementById("root")!).render(<App />);
