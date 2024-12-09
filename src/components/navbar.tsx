"use client";
import Link from 'next/link';
import { useEffect } from 'react';

const themes = [
  'light',
  'dark',
  'cupcake',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'garden',
];

export default function Navbar(): JSX.Element {
  useEffect(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (theme: string): void => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Curlsbot
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            Theme
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {themes.map((theme) => (
              <li key={theme}>
                <button onClick={() => handleThemeChange(theme)}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
