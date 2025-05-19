import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Verifica o tema inicial do localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.classList.toggle("light", savedTheme === 'light');
      setIsDark(savedTheme === 'dark');
    } else {
      document.documentElement.classList.toggle("light", !prefersDark);
      setIsDark(prefersDark);
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isLight = document.documentElement.classList.contains("light");
          setIsDark(!isLight);
          localStorage.setItem('theme', isLight ? 'light' : 'dark');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTimeout(() => {
      document.documentElement.classList.toggle("light");
    }, 100);
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      aria-label="Tema" 
      onClick={toggleTheme} 
      className="focus:outline-none focus:ring-0"
    >
      {isDark ? (
        <FiMoon className="h-5 w-5 text-muted-foreground" />
      ) : (
        <FiSun className="h-5 w-5 text-muted-foreground" />
      )}
    </Button>
  );
};

export default ThemeSwitch; 