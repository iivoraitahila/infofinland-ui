module.exports = {
  // mode: 'jit',
  content: ['./src/**/*.jsx', './pages/**/*.jsx'],
  // purge: {
  //   enabled: process.env.production === true,
  //   content: ['./src/**/*.jsx', './pages/**/*.jsx'],
  //   defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  // },
  theme: {
    fontSize: {
      h1xl: ['4.5rem', '1.2'],
      h1: ['3rem', '1.2'],
      h2xl: ['3rem', '1.2'],
      h2: ['1.8rem', '1.2'],
      h3xl: ['2rem', '1.2'],
      h3: ['1.5rem', '1.2'],
      h4xl: ['1.5rem', '1.2'],
      h4: ['1.125rem', '1.2'],
      h5xl: ['1.25rem', '1.2'],
      h5: ['1.125rem', '1.2'],
      h6: ['1rem', '1.2'],
      'body-small': ['1rem', '1.5rem'],
      body: ['1.125rem', '1.875rem'],
      'body-large': ['1.25rem', '2rem'],
      small: ['0.875rem', '1.75em'],
      tight: ['0.875rem', '1.5em'],
      action: ['0.75rem', '1.5'],
      message: ['0.75rem', '1.125rem'],
      tiny: ['0.813rem', '1.5em'],
      fine: ['0.688rem', '2em'],
    },
    boxShadow: {
      'bottom-bar': '0px -6px 25px -4px rgba(0, 0, 0, 0.20)',
      button: '0px 2px rgba(0, 0, 0, 0.15)',
      'button-hover': 'none',
      'themecard-blue': ' 0px 2px #CCDDED',
      'themecard-green': ' 0px 2px #C4D6B7',
      // dropdown: '0px 4px 17px 0px rgba(0, 0, 0, 0.25)',
      topbar: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
      input: 'inset 2px 2px 4px rgba(0, 0, 0, 0.15)',
      '404title': ' 0px 1px 5px 0px rgba(0, 0, 0, 0.15)',
    },
    borderRadius: {
      DEFAULT: '5px',
    },
    colors: {
      'bodytext-color': { DEFAULT: '#333333' },
      link: { DEFAULT: '#166485', hover: '#339DCA' },
      orange: {
        DEFAULT: '#F4A368',
        light: '#FFC075',
        lighter: '#FCE9D1',
        white: '#FDF8F2',
      },
      green: {
        DEFAULT: '#129942',
        light: '#B4DE93',
        lighter: '#E1F1D5',
        white: '#F0F8EA',
      },
      red: {
        DEFAULT: '#ED3621',
        light: '#EB6B5C',
        lighter: '#F6CBC6',
        white: 'rgba(237, 54, 33,0.1)',
      },
      blue: {
        DEFAULT: '#00A3E8',
        light: '#7FD5F9',
        lighter: '#D6EBF4',
        white: '#ECF9FF',
      },
      white: { DEFAULT: '#FFFFFF' },
      black: {
        DEFAULT: '#000000',
        op5: 'rgba(0,0,0,0.5)',
        op3: 'rgba(0,0,0,0.3)',
        'op1.5': 'rgba(0,0,0,0.15)',
        op1: 'rgba(0,0,0,0.1)',
      },
      gray: {
        darker: '#3F3F3F',
        'darker-op2': 'rgba(63,63,63,0.2)',
        dark: '#585858',
        DEFAULT: '#707070',
        medium: '#848484',
        light: '#979797',
        hr: '#C1C1C1',
        lighter: '#F0F0F0',
        'lighter-teal': '#F0F4F4',
        white: '#F5F5F5',
      },
      neon: {
        red: '#F54747',
        green: '#00ff00',
        pink: '#FF007A',
        yellow: '#E2F40F',
      },
    },
    fontFamily: {
      sans: ['Noto Sans'],
    },
    extend: {
      // variants: { height: ['responsive'] },
      animation: ['hover', 'focus'],
      // boxShadow: {
      //   button: '0px 2px rgba(0, 0, 0, 0.15)',
      //   'button-hover': 'none',
      //   dropdown: '0px 4px 17px 0px rgba(0, 0, 0, 0.25)',
      //   topbar: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
      //   input: 'inset 2px 2px 4px rgba(0, 0, 0, 0.15)',
      //   '404title': ' 0px 1px 5px 0px rgba(0, 0, 0, 0.15)',
      // },
      width: {
        navi: '18.625rem',
        // 'secondary-navi': '32.625rem',
        article: '46rem',
        articlexl: '72rem',
        drawer: '18.625rem',
        drawerxl: '28rem',
      },
      maxWidth: {
        article: '46rem',
        topbar: '100rem',
      },
      screens: {
        '3xl': '1600px',
        '4xl': '1980px',
        'sm-max': { max: '639px' },
      },
      borderWidth: {
        3: '3px',
        5: '5px',
        10: '10px',
      },
      height: {
        topbar: '60px',
        topbarxl: '80px',
        heroxl: '26rem',
        hero: '14rem',
        homehero: '27.125rem',
        homeheroxl: '37.25rem',
      },
      minHeight: {
        'bottom-bar': '12rem',
        card: '7rem',
        lang404: '24rem',
      },
      leading: {
        one: '1',
      },
      // fontSize: {
      //   h1xl: ['4.5rem', '1'],
      //   h1: ['3rem', '1'],
      //   h2xl: ['3.25rem', '1'],
      //   h2: ['2rem', '1'],
      //   h3xl: ['2rem', '1'],
      //   h3: ['1.5rem', '1'],
      //   h4xl: ['1.5rem', '1.2'],
      //   h4: ['1.125rem', '1.2'],
      //   h5xl: ['1.25rem', '1.2'],
      //   h5: ['1.125rem', '1.2'],
      //   h6: ['1rem', '1.2'],
      //   'body-small': ['1rem', '1.5rem'],
      //   body: ['1.125rem', '1.688rem'],
      //   'body-large': ['1.25rem', '2rem'],
      //   small: ['0.875rem', '1.75em'],
      //   tight: ['0.875rem', '1.5em'],
      //   action: ['0.75rem', '1.5'],
      //   message: ['0.75rem', '1.25'],
      //   tiny: ['0.813rem', '1.5em'],
      //   fine: ['0.688em', '2em'],
      // },
    },
  },
  plugins: [require('tailwindcss-rtl')],
}
