import { IconFacebook, IconInstagram, IconTwitter, IconYoutube } from '../Icons'
import { HERO_MARGIN } from '../article/Article'
import Link from 'next/link'
import cls from 'classnames'
const Footer = () => (
  <footer className={cls(HERO_MARGIN, 'mb-8')}>
    <div className="py-10 border-t border-b border-gray ifu-footer__brand">
      <div className="mx-auto sm:mx-0 mb-5 ifu-footer__hki-logo" />

      <p className="mx-8 md:mx-0 text-fine text-center sm:text-left text-gray">
        The InfoFinland website is published by the City of Helsinki, and it is
        funded by the state and the InfoFinland member municipalities.
      </p>
    </div>
    <div className="flex justify-center sm:justify-start items-center py-11 sm:py-7 mb-5 space-s-4">
      <div>
        <Link href="/" passHref>
          <a>
            <IconFacebook title="Facebook" />
          </a>
        </Link>
      </div>
      <div>
        <Link href="/" passHref>
          <a>
            <IconTwitter title="Twitter" />
          </a>
        </Link>
      </div>
      <div>
        <Link href="/" passHref>
          <a>
            <IconInstagram title="Instagram" />
          </a>
        </Link>
      </div>
      <div>
        <Link href="/" passHref>
          <a>
            <IconYoutube title="Youtube" />
          </a>
        </Link>
      </div>
    </div>
    <div className="mb-4 text-center sm:text-left divide-black divide-s">
      <Link href="#about" passHref>
        <a className="ifu-footer__link">About</a>
      </Link>
      <Link href="#privacy" passHref>
        <a className="ifu-footer__link">Privacy</a>
      </Link>
      <Link href="#terms" passHref>
        <a className="ifu-footer__link">Terms</a>
      </Link>
      <Link href="#cookies" passHref>
        <a className="ifu-footer__link">Cookies</a>
      </Link>
      <Link href="#feedback" passHref>
        <a className="ifu-footer__link">Feedback</a>
      </Link>
      <Link href="#about" passHref>
        <a className="ifu-footer__link">About</a>
      </Link>
      <Link href="#privacy" passHref>
        <a className="ifu-footer__link">Privacy</a>
      </Link>
      <Link href="#terms" passHref>
        <a className="ifu-footer__link">Terms</a>
      </Link>
    </div>
  </footer>
)

export default Footer