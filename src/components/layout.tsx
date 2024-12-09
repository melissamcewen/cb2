import Navbar from './navbar';
import { LayoutProps } from '../types';

export const siteTitle = 'Curlsbot';

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div>
      <Navbar />
      <main className="container w-full md:max-w-3xl mx-auto pt-0">
        {children}
      </main>
    </div>
  );
}