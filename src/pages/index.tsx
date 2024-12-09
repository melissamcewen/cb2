import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import CurlsBot from '../components/curlsbot';

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <CurlsBot />
    </Layout>
  );
}