import Head from 'next/head'
import HomeHero from '@/components/home/HomeHero'
import Layout from '@/components/layout/Layout'
import ThemeList from '@/components/home/ThemeList'
import CitySelector from '@/components/home/CitySelector'
import HomeAbout from '@/components/home/HomeAbout'
import Block from '@/components/layout/Block'
import { getCommonApiContent, resolvePath } from '@/lib/ssr-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps(context) {
  const common = await getCommonApiContent(context)
  const themes = common.menu.tree.map(({ url }) => url)
  const themeNodes = await Promise.all(
    themes.map((path) => resolvePath({ path, context }))
  )
  const data = themeNodes.map(({ data }) => data)
  console.log({ data })

  return {
    props: {
      ...common,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}

const HomePage = ({ menu, footerMenu }) => {
  return (
    <Layout menu={menu} footerMenu={footerMenu}>
      <Head>
        <title>Article demo page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeHero
        title="Your source for living in Finland"
        image="/images/home.png"
      />
      {/* <div className="mx-6 lg:mx-12 xl:mx-24 2xl:mx-48 mb-16 4xl:max-w-6xl"> */}
      <Block>
        <p className="mb-8 text-body text-bodytext-color">
          The education system includes early childhood education, preschool
          education, comprehensive education, upper secondary education and
          higher education. Adult education is intended for adults and it
          includes a multitude of alternatives from comprehensive to higher
          education.
        </p>
      </Block>

      <Block>
        <ThemeList themes={menu.tree} showImages />
      </Block>
      <CitySelector />
      <HomeAbout />
      {/* </div> */}
    </Layout>
  )
}

export default HomePage
