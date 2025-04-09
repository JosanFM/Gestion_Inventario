import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);
  

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {

      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {

      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);
  

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    

    document.documentElement.setAttribute('data-theme', newTheme);
    

    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <div className="theme-switch-container">
      <button className="theme-switch-button" onClick={toggleTheme}>
        <span className="theme-icon">{isDarkMode ? '☀️' : '🌙'}</span>
        {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;