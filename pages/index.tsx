import { log } from 'console';
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import { request } from "../lib/datocms";
import Home from '../components/pages/Home';
import DataInterface from '../types/DataInterface';
import PreloaderWrapper from '../components/preloaders/PreloaderWrapper';

const HOMEPAGE_QUERY = `{
  allWorks {
    id
    title
    desc
    slug
    laoder {hex}
    image {url}
    _status
    _firstPublishedAt
  }
	heroSlideshow{
    images{url}
  }
  _allWorksMeta {
    count
  }
}`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 }
  });
  return {
    props: { data }
  };
}



function HomePage({data}:{data:DataInterface}) 
{  
  return (
    <div>      
      <Head>
          <title>GraphicHunters - The Creative Studio Focused on Sports</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.svg" />
      </Head>        
      <PreloaderWrapper>
        <Layout>
          <Home data={data}/>
        </Layout>
      </PreloaderWrapper>      
    </div>
  )
}

export default HomePage
