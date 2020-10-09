import React from 'react'
import {RecoilRoot} from 'recoil'

import '../styles/reset.scss'
import '../styles/colors.scss'

function MyApp({Component, pageProps}) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
