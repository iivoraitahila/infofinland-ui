import { useRouter } from 'next/router'
import Link from 'next/link'
import { IconGlobe } from '../Icons'
import cls from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { languages } from '../../../i18n'

const LanguageSelector = ({ openMenu }) => {
  const { pathname, query, locale } = useRouter()

  const { t } = useTranslation('common')

  return (
    //Check data structure with real data
    <>
      <div
        dir="ltr"
        className=" hidden lg:block text-action leading-10 divide-x xl:divide-x-0 divide-black me-4 md:ms-1"
        role="listbox"
      >
        <button className=" xl:hidden lg:px-0 pe-2 ps-2" onClick={openMenu}>
          <span className="hidden md:inline-block xl:hidden">
            {t('languageSelector.button')}
          </span>
          <IconGlobe className="xl:hidden mx-2 xl:mx-0 w-5 h-5" />
        </button>
        {languages.map(({ text, code }) => (
          <Link
            href={{ pathname, query }}
            locale={code}
            passHref
            scroll={false}
            key={`lang-${code}`}
          >
            <a
              className="px-3 2xl:px-4 font-bold text-center uppercase xl:inline-block"
              title={text}
              hrefLang={code}
              lang={code}
              role="option"
              aria-selected={code === locale}
            >
              <span
                className={cls('xl:hidden', {
                  ' border-b-3 border-black': locale === code,
                })}
              >
                {code}
              </span>
              <span
                className={cls(
                  'hidden xl:inline-block hover:border-black border-b-2',
                  {
                    'border-black': locale === code,
                    'border-white': locale !== code,
                  }
                )}
              >
                {text}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}

export default LanguageSelector