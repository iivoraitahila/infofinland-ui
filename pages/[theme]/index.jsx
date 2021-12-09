import ThemePage from '../../src/page-templates/ThemePage'
import {
  getCommonApiContent,
  getMainMenu,
  addPrerenderLocalesToPaths,
  getPageByPath,
} from '@/lib/ssr-api'
import { map } from 'lodash'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticPaths(context) {
  let paths = []

  try {
    const { tree } = await getMainMenu(context)
    // Tree contains array of pages with subpages included inside.
    // Map first level to get all themes
    paths = addPrerenderLocalesToPaths(
      map(tree, ({ url }) => {
        //remove root slash and language code
        const [, , theme] = url.split('/')
        return {
          params: {
            theme,
          },
        }
      })
    )
  } catch (e) {
    console.error(e)
    const err = new Error(
      'Error while getting menu paths for prerender in [theme].getStaticPaths'
    )
    // if(process.env.production){

    // } else {
    throw err
    // }
  }

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const common = await getCommonApiContent(context)
  const path = `/${context.params.theme}`
  const { content, node } = await getPageByPath({ path, context })
  if (node === null) {
    return { notFound: true }
  }

  return {
    props: {
      ...common,
      content,
      node,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: process.env.REVALIDATE_TIME,
  }
}

export default ThemePage
