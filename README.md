# React Sample

[![GitHub stars](https://img.shields.io/github/stars/raminr77/react_sample?style=social)](https://github.com/raminr77/react_sample/)

## Start your React Project with a ready config!

this is a sample of the ReactJs project for starting easily and fast.
<br/>
In this project, we added some configs and installed some necessary packages. they help you to ready very fast and don't waste time them.
<br />

## Contents

- [Configs](https://github.com/raminr77/react_sample#Configs)
- [Packages](https://github.com/raminr77/react_sample#Packages)
- [Hooks](https://github.com/raminr77/react_sample#Hooks)
- [Tools (utils)](https://github.com/raminr77/react_sample#tools-utils)

- [How To Run](https://github.com/raminr77/react_sample#how-to-run)
- [Other Commands](https://github.com/raminr77/react_sample#other-commands)
- [API Pattern Example](https://github.com/raminr77/react_sample#api-pattern-example)
- [You Can Use In This Project](https://github.com/raminr77/react_sample#you-can-use-in-this-project)

<br />
<hr />
<br />

- ## Configs

  - Eslint
  - Prettier
  - Atylelint
  - Dockerfile
  - `.env` file
  - Redux Config
  - Style Config
  - `jsconfig` file
  - SEO & PWA tags
  - API cache system
  - create `constants`
  - Private route system
  - `lint-staged` config
  - Edit `manigest.json`
  - First loading animation
  - API Pattern for request
  - Lock API request system
  - Cancel duplicate request
  - Reset default browser CSS
  - Pre-Commit config (husky)
  - Scroll to the top when route change
  - Transform data system for API request

- ## Packages

  - sass (for component module sass)
  - animate.css (for your animations)
  - tailwindcss (for main style system)
  - lodash (for working easily with array)
  - axios (for API service and request system)
  - classnames (for merge ClassNames and module sass)
  - nookies (for working with cookies like token system)
  - react-router-dom (for routing system in your project)
  - prop-types (for specify type in your JSX & component file)
  - react-toastify (for notify message to user in your project)
  - react-device-detect (for check devices and specify mobile type)
  - @reduxjs/toolkit & react-redux (for state management in your project)

- ## Hooks

  - useApi (for in page requests)
  - useCopyToClipboard (for copy text)
  - usePageData (for main page requests)
  - useOnScreen (for traking an element on screen)

- ## Tools (utils)

  - Snackbar
  - `htmlDecode` function
  - URLs for share in social
  - `generateSnackbar` function
  - `apiRequestObject` for API pattern
  - `removeUndefinedFromObj` function
  - `propsToClassName` for working with props
  - Log system (Empty function for your config)
  - `setCookie`, `getCookie` and `removeCookie` functions
  - `redirect` and `attachObjectQueriesToUrl` functions
  - `truncate` and `shouldTruncate` functions for your texts
  - `isDemo`, `isProduction`, `isDevelopment`, `appVersion` and `appName` variables
  - `faToEn`, `enToFa`, `arToFa`, `faPriceToEnNumber` and `formatPrice` functions for your numbers

<br />

## You Can Use In This Project

- You can use the AnimateCSS framework for your animations, add the class `animate__animated` to an element, along with any of the animation names white the `animate__` prefix.

  `<h1 class="animate__animated animate__bounce">An animated element</h1>`

  REF: https://animate.style/

- You can use `Vazir` font in this project. for change `EN` to `FA` number with font, use `fa-num-font` and `fa-num-font-bold` class. also you can use `vazir-bold` for bold type.
- You can import file from `src` address like this:

  `import { INDEX_PAGE_ROUTE } from 'routes/RedirectRoutes';`

<br />

## API Pattern Example

- Your API

  **TODO**

- useApi

  **TODO**

- usePageData

  **TODO**

<br />

## How To Run

- First Git Clone Or Download Project
- Copy and rename `.env.example` to `.env`
- `npm install` or `yarn add`
- Just Run: `npm start`
- Run white style watching:
  - Windows: `npm run dev:win`
  - Linux or MaxOs: `npm run dev:linux`

## Other Commands

- Test: `npm run test`
- Build: `npm run build`
- Eslint: `npm run lint:fix`
- Prettier: `npm run pretty`
- Stylelint: `npm run lint:style`
- Styles (Watching): `npm run styles`
- Build Styles: `npm run build:styles`

<hr />

### Project TODO

- [x] useApi
- [ ] storybook
- [x] usePageData
- [x] API cache system
- [x] cancel duplicate request
- [ ] Add API pattern Doc to MD file
- [ ] Add usePageData & UseApi Doc to MD file
