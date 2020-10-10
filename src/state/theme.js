import {atom, useRecoilTransactionObserver_UNSTABLE} from 'recoil'

export const isLightThemeState = atom({
  key: 'isLightTheme',
  default: true,
})
