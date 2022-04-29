import Head from 'next/head';
import Image from 'next/image';
//import styles from './layout.module.css';
//import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Navbar from './navbar';
const name = 'Melissa';
export const siteTitle = 'Curlsbot';

export default function Layout({ children, home }) {
  return (
    <div>
      <Navbar />
      <main className="container w-full md:max-w-3xl mx-auto pt-20">{children}</main>
    </div>
  );
}
