import { useTranslation } from 'next-i18next'
import { IconLookingGlass, IconCross } from '@/components/Icons'
import Drawer from '@/components/search/SearchDrawer'
import { useState } from 'react'
import useSearchResults from '@/hooks/useSearchResults'
import { useAtom } from 'jotai'
import { searchQueryValue } from '@/src/store'
import { Suspense } from 'react'
import Link from 'next/link'
import useSearchRoute from '@/hooks/useSearchRoute'
import cls from 'classnames'

const SEARCH_BUTTON_LABEL_ID = 'ifu-searchbar__label'

const Search = () => {
  const [isSearchOpen, setVisibility] = useState({
    desktop: false,
    mobile: false,
  })
  const [query, setQuery] = useAtom(searchQueryValue)
  const { t } = useTranslation('common')
  // const closeMobile = () => setVisibility({false})
  // const closeDesktop = () => setDesktopVisibility(false)
  const closeAll = () => {
    setVisibility({ desktop: false, mobile: false })
  }
  const reset = () => {
    closeAll()
    // And reset top menu search bar query word
    setQuery('')
  }
  const onSubmit = useSearchRoute({ onSubmit: reset, q: query })

  const onChange = ({ target: { value } }) => setQuery(value)

  return (
    <>
      <div className="flex-none text-right md:w-26 md:pe-4">
        <button
          onClick={() =>
            setVisibility({ desktop: false, mobile: !isSearchOpen.mobile })
          }
          className=" md:hidden w-8 h-8 text-action"
          title={t('buttons.search')}
          aria-expanded={isSearchOpen.mobile}
          aria-haspopup="dialog"
        >
          <span className="px-2 transform translate-y-0.5">
            {!isSearchOpen.mobile && <IconLookingGlass className="" />}
            {isSearchOpen.mobile && <IconCross className="me-2" />}
          </span>
        </button>
        <button
          onClick={() =>
            setVisibility({ desktop: !isSearchOpen.desktop, mobile: false })
          }
          className=" hidden md:inline-block h-8 text-action text-right"
          title={
            isSearchOpen.desktop ? t('buttons.close') : t('buttons.search')
          }
        >
          <span className="px-2 transform translate-y-0.5">
            {!isSearchOpen.desktop && <IconLookingGlass className="" />}
            {isSearchOpen.desktop && <IconCross className="me-2" />}
          </span>
          {!isSearchOpen.desktop && (
            <span className="hidden md:inline-block">
              {t('buttons.search')}
            </span>
          )}
        </button>
      </div>
      {/* Mobile */}
      <Drawer close={closeAll} isOpen={isSearchOpen.mobile}>
        <SearchBar onSubmit={onSubmit} onChange={onChange} query={query} />
      </Drawer>

      {/* Desktop */}
      <SearchDesktopBar close={closeAll} isOpen={isSearchOpen.desktop}>
        <SearchBar onSubmit={onSubmit} onChange={onChange} query={query} />
      </SearchDesktopBar>
    </>
  )
}

const SearchBar = ({ onSubmit, onChange, query }) => {
  const { t } = useTranslation('common')
  return (
    <>
      <form
        className="pt-4 max-w-topbar bg-white"
        action="/hae"
        onSubmit={onSubmit}
      >
        <label
          htmlFor={SEARCH_BUTTON_LABEL_ID}
          className={cls(
            ' mx-4 md:mx-6 text-gray-medium  transition-opacity ',
            {
              'opacity-0 duration-50': query.length === 0,
              'opacity-100 duration-150': query.length > 0,
            }
          )}
        >
          {t('search.placeholder')}
        </label>
        <div className=" flex items-center mx-2">
          <div className="overflow-hidden flex-grow h-14 border-b border-black-op5">
            <input
              type="text"
              name="q"
              id={SEARCH_BUTTON_LABEL_ID}
              autoComplete="off"
              value={query}
              onChange={onChange}
              placeholder={t('search.placeholder')}
              autoFocus
              className="py-3 px-1 w-full text-h3 placeholder:text-gray-light outline-none ps-2 md:ps-4"
            />
          </div>
          <div className="flex flex-none items-center h-14 border-b border-gray-light">
            <button
              type="submit"
              className="me-2.5 md:pe-2"
              title={t('buttons.search')}
              aria-label={t('buttons.search')}
            >
              <IconLookingGlass className="mx-2" />
            </button>
          </div>
        </div>
      </form>
      <Suspense
        fallback={<div className="mx-4 h-40">{t('search.loading')}</div>}
      >
        <SWRResults />
      </Suspense>
    </>
  )
}

const SearchDesktopBar = ({ children, isOpen }) => {
  return isOpen ? (
    <div className=" hidden md:block overflow-visible absolute top-20 right-0 left-0 pb-2 h-24 md:h-auto bg-white shadow-topbar">
      <div className="">{children}</div>
    </div>
  ) : null
}

const Result = ({ title, url }) => (
  <p className="mb-4">
    <Link passHref href={url} prefetch={false}>
      <a> {title}</a>
    </Link>
  </p>
)

export const SWRResults = () => {
  const results = useSearchResults()
  return (
    <div className="mx-4 md:mx-6 mt-4">
      {results.map((r, i) => (
        <Result {...r} key={`r-${i}`} />
      ))}
    </div>
  )
}

export default Search