import Head from 'next/head'
import HomeHero from '@/components/home/HomeHero'
import Layout from '@/components/layout/Layout'
// import { ARTICLE_MARGIN_CLASS } from '../components/theme/page/subpage/Article'
import ThemeList from '@/components/home/ThemeList'
import CitySelector from '@/components/home/CitySelector'
import HomeAbout from '@/components/home/HomeAbout'
import Block from '@/components/article/Block'
import { getMenu,getPathsFromContext, getResourceFromContext} from "next-drupal"


export async function getStaticPaths(context) {
  console.log({context})
  return {
    paths: await getPathsFromContext("node--page", context),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  console.log({context})
  // const node = await getResourceFromContext("node--page", context)
  // console.log(node)
  // Fetch the main menu.
  // const { tree } = await getMenu("")

  // return {
  //   props: {
  //     node,
  //     menu: tree,
  //   },
  // }
}

const HomePage = ({node,menu}) => (
  <Layout menu={menu}>
    <Head>
      <title>Article demo page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HomeHero
      title="Your source for living in Finland
"
      image="/images/home.png"
    />
    {/* <div className="mx-6 lg:mx-12 xl:mx-24 2xl:mx-48 mb-16 4xl:max-w-6xl"> */}
    <Block>
      <p className="mb-8 text-body text-bodytext-color">
        The education system includes early childhood education, preschool
        education, comprehensive education, upper secondary education and higher
        education. Adult education is intended for adults and it includes a
        multitude of alternatives from comprehensive to higher education.
      </p>
    </Block>
    <Block>
      <ThemeList themes={[]} showImages />
    </Block>
    <CitySelector />
    <HomeAbout />
    {/* </div> */}
  </Layout>
)

export default HomePage
