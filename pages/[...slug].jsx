import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getResource, getResourceTypeFromContext } from 'next-drupal'
import ArticlePage from '@/src/page-templates/ArticlePage'
import AboutPage from '@/src/page-templates/AboutPage'
import { i18n } from '@/next-i18next.config'
import { NODE_TYPES } from '@/lib/DRUPAL_API_TYPES'
import {
  getCommonApiContent,
  NOT_FOUND,
  getQueryParamsFor,
  getDefaultLocaleNode,
  getAboutMenu,
  resolvePath,
  menuErrorResponse,
} from '@/lib/ssr-api'

import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'

export async function getStaticPaths() {
  // const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

  return {
    paths: [],
    fallback: 'blocking',
  }

  // const { items } = await getMainMenu(context).catch((e) => {
  //   console.error('Error while getting main menu', e)
  //   // if (process.env.development) {
  //   //   console.error(e)
  //   // }
  //   return { items: [] }
  // })
  // const paths = items
  //   // Filter out theme pages
  //   .filter(({ parent }) => parent !== '')
  //   // Parse to theme and path slug
  //   .map(({ url }) => {
  //     //remove root slash and language code
  //     const [, , ...path] = url.split('/')
  //     return {
  //       params: {
  //         path,
  //       },
  //     }
  //   })

  // return {
  //   paths: addPrerenderLocalesToPaths(paths),
  //   fallback: 'blocking',
  // }
}

export async function getStaticProps(context) {
  const { serverRuntimeConfig } = getConfig()
  const { params, locale } = context
  const path = params.slug?.join('/') || params.slug
  // Resolve path, get node uuid
  const { data } = await resolvePath({
    path,
    context: { locale },
  }).catch((e) => {
    if (e?.response?.status === 404) {
      return { data: null }
    }
    console.error(e)
    throw new Error('Unable to resolve path')
  })
  if (!data) {
    return NOT_FOUND
  }
  const id = data.entity.uuid
  // get menus and page node

  const type = await getResourceTypeFromContext(context)

  //Allow only pages and landing pages to be queried
  if(![NODE_TYPES.PAGE, NODE_TYPES.LANDING_PAGE].includes(type)) {
    console.error('Error resolving page. Node type not allowed:',type)
    return NOT_FOUND
  }

  const [common, node, aboutMenu] = await Promise.all([
    getCommonApiContent(context),
    getResource(type, id, {
      locale,
      params: getQueryParamsFor(type),
    }).catch((e) => {
      console.error('Error requesting node ', id, e)
      throw e
    }),
    getAboutMenu(context).catch((e) => {
      console.error('Error requesting About-menu with node ', id, e)
      return menuErrorResponse(e)
    }),
  ])


  // Return 404 if node was null
  if (!node) {
    return NOT_FOUND
  }

  let fiNode = null // Must be JSON compatible

  if (type === NODE_TYPES.PAGE) {
    // Get finnish title if page is not in finnish
    if (context.locale !== i18n.fallbackLocale) {
      fiNode = await getDefaultLocaleNode(id).catch((e) => {
        console.error('Error while getting Finnish title', e)
        return null
      })
    }
  }

  return {
    props: {
      type,
      ...common,
      aboutMenu,
      node,
      fiNode,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: serverRuntimeConfig.REVALIDATE_TIME,
  }
}

/***
 * Layout selector:
 * if page is in aboutMenu, use AboutPage, otherwise use ArticlePage
 */
const Page = (props) => {
  const { localePath } = useRouterWithLocalizedPath()
  const { aboutMenu } = props
  const isAboutPage =
    aboutMenu?.items.find(({ url }) => url === localePath) !== undefined
  if (isAboutPage) {
    return <AboutPage {...props} menu={aboutMenu} />
  }
  return <ArticlePage {...props} />
}

export default Page