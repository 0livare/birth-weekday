import React from 'react'
import {RecoilRoot} from 'recoil'

import {PersistenceObserver, initializeState} from '../state/persistence'
import '../styles/reset.scss'
import '../styles/colors.scss'

function MyApp({Component, pageProps}) {
  return (
    <RecoilRoot initializeState={initializeState}>
      <PersistenceObserver />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
