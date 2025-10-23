import React from 'react';
import type { Theme } from '../types';
import { SunIcon, MoonIcon } from './icons';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-600 dark:text-gray-300 bg-gray-200/50 dark:bg-slate-800/50 hover:bg-gray-300/70 dark:hover:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-slate-900 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;