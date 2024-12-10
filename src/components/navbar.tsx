"use client";
import Link from 'next/link';

export default function Navbar(): JSX.Element {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Curlsbot
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/ingredients">Ingredients</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
