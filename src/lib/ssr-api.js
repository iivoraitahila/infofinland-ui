import { getMenu, getResource } from 'next-drupal'
import { i18n } from '../../next-i18next.config'
import axios from 'axios'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import getConfig from 'next/config'
import { NODE_TYPES } from './DRUPAL_API_TYPES'
const ROUTER_PATH = '/router/translate-path'
const NO_DEFAULT_LOCALE = 'dont-use'
const disableDefaultLocale = (locale) => ({
  locale,
  defaultLocale: NO_DEFAULT_LOCALE,
})

const menuErrorResponse = () => ({ items: [], tree: [], error: 'menu-error' })

// Export query params through ssr-api for convenience
export * from './query-params'

export const NOT_FOUND = { notFound: true }

export const getHeroFromNode = (node) => ({
  url: `${getConfig().publicRuntimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}${
    node?.field_hero?.field_hero_image.field_media_image.uri.url
  }`,
  title: node?.field_hero?.field_hero_title,
})

export const getImage = (item) => ({
  src: `${getConfig().publicRuntimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}${
    item.field_image?.field_media_image.uri.url
  }`,
  caption: item.field_image?.field_image_caption,
  //alt,title,width,height
  ...item.field_image?.field_media_image.resourceIdObjMeta,
})

export const getLinks = ({ collection, locale } = {}) => {
  if (!locale) {
    console.error('Cannot resolve main link without locale')
    return
  }
  return collection?.map(
    ({ field_link_target_site: siteName, field_links, title }) => {
      //is there a link that matches request locale
      let mainTranslation = field_links.find(
        ({ field_language }) => field_language.field_locale === locale
      )
      //if not, is there a link that matches default locale EN
      if (!mainTranslation) {
        mainTranslation = field_links?.find(
          ({ field_language }) =>
            field_language.field_locale === i18n.defaultLocale
        )
      }
      //if not, is there a link that matches fallback locale FI
      if (!mainTranslation) {
        mainTranslation = field_links?.find(
          ({ field_language }) =>
            field_language.field_locale === i18n.fallbackLocale
        )
      }
      mainTranslation = {
        locale: mainTranslation?.field_language?.field_locale,
        url: mainTranslation?.field_language_link,
      }

      const languages = field_links
        .filter(
          ({ field_language }) =>
            field_language.field_locale !== mainTranslation.locale
        )
        .map(({ field_language, field_language_link }) => {
          return {
            url: field_language_link,
            title: field_language.name,
            locale: field_language.field_locale,
          }
        })
        .sort(
          // According to configured language order, same as in language menu
          (a, b) =>
            i18n.locales.indexOf(a.locale) - i18n.locales.indexOf(b.locale)
        )

      return {
        title,
        siteName,
        mainTranslation,
        languages,
      }
    }
  )
}

export const resolvePath = async ({ path, context }) => {
  const { serverRuntimeConfig } = getConfig()
  const { locale, defaultLocale } = context
  const URL = `${serverRuntimeConfig.NEXT_PUBLIC_DRUPAL_BASE_URL}/${
    locale || defaultLocale
  }${ROUTER_PATH}`
  return axios.get(URL, {
    params: { path, _format: 'json' },
  })
}

export const getMainMenu = async (context) =>
  getMenu(getConfig().serverRuntimeConfig.DRUPAL_MENUS.MAIN, context)

export const getFooterAboutMenu = async ({ locale }) =>
  getMenu(
    getConfig().serverRuntimeConfig.DRUPAL_MENUS.FOOTER,
    disableDefaultLocale(locale)
  )

export const getAboutMenu = async ({ locale }) =>
  getMenu(getConfig().serverRuntimeConfig.DRUPAL_MENUS.ABOUT, {
    locale,
    defaultLocale: NO_DEFAULT_LOCALE,
  })

export const getCommonApiContent = async ({ locale }) => {
  const context = { locale, defaultLocale: NO_DEFAULT_LOCALE }
  const [menu, footerMenu] = await Promise.all([
    //Main menu or whatever is called
    getMainMenu(context).catch((e) => {
      console.error('menu error', e)
      return menuErrorResponse(e)
    }),
    //Footer Menu
    getFooterAboutMenu(context).catch((e) => {
      console.error('footerMenu error', e)
      return menuErrorResponse(e)
    }),
  ]).catch((e) => {
    throw e
  })

  return {
    menu,
    footerMenu,
  }
}

export const getDefaultLocaleNode = async (id) =>
  getResource(NODE_TYPES.PAGE, id, {
    locale: i18n.fallbackLocale, //fi
    defaultLocale: NO_DEFAULT_LOCALE,
    params: new DrupalJsonApiParams()
      .addFields(NODE_TYPES.PAGE, ['title'])
      .getQueryObject(),
  })

export const addPrerenderLocalesToPaths = (paths) =>
  getConfig()
    .serverRuntimeConfig.PRERENDER_LOCALES.map((locale) =>
      paths.map((path) => ({ ...path, locale }))
    )
    .flat()
