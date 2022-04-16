import { IconAngleDown, IconAngleUp } from '@/components/Icons'
import Link from 'next/link'
import cls from 'classnames'
import useLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useRef } from 'react'

const SubMenuItem = ({ title, url, selected, items, level, isOpen }) => {
  return (
    <li className="block">
      <Link passHref href={url} locale={false} prefetch={false}>
        <a
          tabIndex={isOpen ? '0' : '-1'}
          className={cls('ifu-mainmenu__item--subitem', {
            'ps-10 ': level === 1,
            'ps-14': level === 2,
            'border-s-5 border-blue/75 hover:border-blue  font-bold': selected,
            'border-s-5 border-white ': !selected,
          })}
        >
          {title}
        </a>
      </Link>
      {items && (
        <SubMenuItems items={items} level={level + 1} isOpen={isOpen} />
      )}
    </li>
  )
}

const SubMenuItems = ({ items, isOpen, level }, ref) => {
  const { localePath, locale } = useLocalizedPath()

  return (
    <ul
      className={cls('ifu-mainmenu__submenu', {
        'hidden opacity-0 duration-300': !isOpen,
        'opacity-100 transition-all': isOpen,
      })}
    >
      {items.map((props) => {
        const selected = props.url === localePath
        return (
          <SubMenuItem
            ref={ref}
            key={`${props.url}-${props.id}-${locale}`}
            {...props}
            level={level}
            selected={selected}
            isOpen={isOpen}
          />
        )
      })}
    </ul>
  )
}

const SubMenu = ({
  items,
  title,
  isOpen,
  toggle,
  selected,
  url,
  selectedIsHidden,
  secondarySelection,
}) => {
  const { t } = useTranslation('common')
  const subMenuLabel = t(isOpen === true ? 'mainMenu.close' : 'mainMenu.open')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({
        behaviour: 'smooth',
        block: 'start',
      })
      scrollRef.current?.classList.add('ifu-mainmenu--scroll-flash')
    }
  }, [isOpen, scrollRef])

  return (
    <>
      <div
        ref={scrollRef}
        className={cls('ifu-mainmenu__item--button', {
          'border-white ': !selected && !selectedIsHidden,
          'border-blue/75 hover:border-blue': selectedIsHidden || selected,
          'font-bold': selected,
          'border-orange/50 border-s-3': isOpen && !selected,
        })}
      >
        <span
          className={cls('border-e-5 w-full flex items-center', {
            'border-green-light/75 hover:border-green-light':
              secondarySelection,
            'border-white hover:border-gray-white': !secondarySelection,
          })}
        >
          <Link passHref href={url} prefetch={false} locale={false}>
            <a className="flex-grow py-4">
              <span className={cls('block', { 'font-bold': selected })}>
                {title}
              </span>
            </a>
          </Link>
          <div className="flex-none">
            <button
              className="block w-16 h-12"
              onClick={toggle}
              title={subMenuLabel}
              aria-label={subMenuLabel}
              aria-expanded={isOpen}
            >
              {!isOpen && (
                <IconAngleUp className="fill-gray-light ifu-mainmenu__submenu-icon--open ifu-mainmenu__submenu-icon" />
              )}
              {isOpen && (
                <IconAngleDown className="fill-gray-dark ifu-mainmenu__submenu-close ifu-mainmenu__submenu-icon" />
              )}
            </button>
          </div>
        </span>
      </div>
      {items && <SubMenuItems items={items} isOpen={isOpen} level={1} />}
    </>
  )
}

export default SubMenu
