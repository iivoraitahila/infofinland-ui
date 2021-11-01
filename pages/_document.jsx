/* eslint-disable @next/next/no-css-tags */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Favicons from '../src/components/layout/Favicons'

class MyDocument extends Document {
  static async getStaticProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const locale = ctx?.locale || 'fi'
    return { ...initialProps, locale }
  }

  render() {
    const direction = process.env.rtlLocales.includes(this.props.locale)
      ? 'rtl'
      : 'ltr'
    return (
      <Html dir={direction} lang={this.props.locale}>
        <Head>
          <Favicons />
          <link
            rel="preload"
            href="/fonts/NotoSans-Bold.ttf"
            as="font"
            type="font/ttf"
          />
          <link
            rel="preload"
            href="/fonts/NotoSans-Regular.ttf"
            as="font"
            type="font/ttf"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument