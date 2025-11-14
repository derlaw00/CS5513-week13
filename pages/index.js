//importing the nextjs <Head> tag to add more info in the HTML <head> tag
import Head from 'next/head';
//importing the <Layout> that was made and the siteTitle variable 
import Layout, { siteTitle } from '../components/layout';
//importing util styles for more css
import utilStyles from '../styles/utils.module.css';
//importing the getSortedPostsData function from the post-json.js file
import { getSortedPostsData } from '../lib/post-cms';
//importing the <Link> tag for smoother transition between website
import Link from 'next/link';
//importing the date component
//import Date from '../components/date';
 


//exporting to nextjs to compile and display
export async function getStaticProps() {
  //getting the sorted posts data
  const allPostsData = await getSortedPostsData();
  //returning the sorted posts data
  return {
    props: {
      allPostsData,
    },
  };
}

//creating the <Home> tag
export default function Home({ allPostsData }) {
  //exporting to nextjs to compile and display
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>just making a website for college</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              {/* <Date dateString={date} /> */}
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

