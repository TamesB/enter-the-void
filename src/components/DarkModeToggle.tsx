
"use client"
import React from 'react';

export function DarkModeToggle() {
    function getThemeFromLocalStorage() {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('theme') === 'dark') {
        return 'dark';
      }
    }
    return 'light';
  }


  const [theme, setTheme] = React.useState(getThemeFromLocalStorage);

  function handleToggle() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

    React.useEffect(() => {
        if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        } else {
        document.documentElement.classList.remove('dark');
        }
    }, [theme]);

  return (

    <button onClick={handleToggle} className="p-2 rounded-md bg-gray-200 dark:bg-gray-800">
        {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
    );
};
export default DarkModeToggle;	
