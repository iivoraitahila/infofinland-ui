import useTranslation from 'next-translate/useTranslation'
import { IconLookingGlass, IconCross } from '@/components/Icons'
import Drawer from '@/components/search/SearchDrawer'
import { useState } from 'react'
import useSearchResults from '@/hooks/useSearchResults'
import { useAtom } from 'jotai'
import { searchQueryValue } from '@/src/store'
import Button from '../Button'
import { Suspense } from 'react'
import Link from 'next/link'
import useSearchRoute from '@/hooks/useSearchRoute'
import { CloseButton } from '@/components/Button'

const Search = () => {
  const [isOpen, setVisibility] = useState(false)
  const [query, setQuery] = useAtom(searchQueryValue)
  const { t } = useTranslation('common')
  const close = () => setVisibility(false)
  const reset = () => {
    close()
    // And reset top menu search bar query word
    setQuery('')
  }
  const onSubmit = useSearchRoute({ onSubmit: reset, q: query })
  const onChange = ({ target: { value } }) => setQuery(value)
  return (
    <>
      <div className=" flex-none 2xl:flex-grow">
        <button
          onClick={() => setVisibility(!isOpen)}
          className=" w-8 md:w-24 h-8 text-action"
          title={t('buttons.search')}
        >
          <span className="px-2 transform translate-y-0.5">
            {!isOpen && <IconLookingGlass className="" />}
            {isOpen && <IconCross className="me-2" />}
          </span>
          {!isOpen && (
            <span className="hidden md:inline-block">
              {t('buttons.search')}
            </span>
          )}{' '}
        </button>
      </div>
      {/* Mobile */}
      <div className="md:hidden">
      <Drawer close={close} isOpen={isOpen}>
        <SearchBar onSubmit={onSubmit} onChange={onChange} query={query} />
      </Drawer>
      </div>

      {/* Desktop */}
      <SearchDesktopBar close={close} isOpen={isOpen}>
        <SearchBar onSubmit={onSubmit} onChange={onChange} query={query} />
      </SearchDesktopBar>
    </>
  )
}

const SearchBar = ({ onSubmit, onChange, query }) => {
  const { t } = useTranslation('common')

  return (
    <>
      {' '}
      <form className="bg-white" action="/hae" onSubmit={onSubmit}>
        <div className="flex items-center py-4 mx-2 md:mx-4">
          <div className="overflow-hidden flex-grow h-14 md:h-16 border-b border-gray-lighter">
            <input
              type="search"
              name="q"
              autoComplete="off"
              value={query}
              onChange={onChange}
              placeholder={t('search.placeholder')}
              autoFocus
              className="py-3 px-1 w-full text-h3 outline-none"
            />
          </div>
          <div className="flex flex-none items-center h-14 md:h-16 border-b border-gray-lighter">
            <Button type="submit" className="hidden md:inline-block me-2">
              <IconLookingGlass className="mx-2" />
            </Button>
            <button type="submit" className="inline-block md:hidden me-2">
              <IconLookingGlass className="mx-2" />
            </button>
          </div>
        </div>
      </form>
      <Suspense fallback={<div className="mx-4">loading....</div>}>
        <SWRResults />
      </Suspense>
    </>
  )
}

const SearchDesktopBar = ({ close, children, isOpen }) => {
  return isOpen ? (
    <div className=" hidden md:block overflow-visible absolute top-20 right-0 left-0 pb-2 h-24 md:h-auto bg-white shadow-topbar">
      <div className="md:hidden mb-2 md:max-w-screen-3xl h-12">
        <CloseButton className="float-end me-6" close={close} />
      </div>
      <div className="md:max-w-screen-3xl">{children}</div>
    </div>
  ) : null
}

const Result = ({ title, url }) => (
  <p className="mb-4">
    <Link passHref href={url}>
      <a> {title}</a>
    </Link>
  </p>
)

export const SWRResults = () => {
  const results = useSearchResults()
  return (
    <div className="mx-4">
      {results.map((r, i) => (
        <Result {...r} key={`r-${i}`} />
      ))}
    </div>
  )
}

export default Search
