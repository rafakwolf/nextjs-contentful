import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { createClient } from 'contentful'
import { IArticle } from '../@types/generated/contentful';

interface Props {
  articles: IArticle[]
}

export const getStaticProps: GetStaticProps = async (context) => {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? "",
    accessToken: process.env.CONTENTFUL_API_ACCESS_TOKEN ?? ""
  });

  const resp = await client.getEntries<IArticle>({
    content_type: "article"
  });

  return {
    props: {
      articles: resp.items
    }
  };
}

const Home: NextPage<Props> = (props) => {

  const { articles } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Articles List</h1>

      <main className={styles.main}>
        <ul>
          {articles.map(article => <li key={article.sys.id}>{article.fields.title}</li>)}
        </ul>
      </main>

      <footer className={styles.footer}>
        <p>Footer here</p>
      </footer>
    </div>
  );
}

export default Home
