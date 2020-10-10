import {useRecoilTransactionObserver_UNSTABLE} from 'recoil'

import {isLightThemeState} from './theme'

// See: https://recoiljs.org/docs/guides/persistence/
export function PersistenceObserver() {
  useRecoilTransactionObserver_UNSTABLE(({snapshot}) => {
    for (let modifiedAtom of snapshot.getNodes_UNSTABLE({isModified: true})) {
      let atomLoadable = snapshot.getLoadable(modifiedAtom)

      let key = modifiedAtom.key
      let value = atomLoadable.contents

      if (atomLoadable.state === 'hasValue') {
        window.localStorage.setItem(key, JSON.stringify({value}))
      }
    }
  })

  return null
}

// See: https://recoiljs.org/docs/guides/persistence/
export function initializeState({set}) {
  if (typeof window === 'undefined') return

  for (const [key, value] of Object.entries(window.localStorage)) {
    let atom = myLookupOfAtomWithKey(key)
    if (atom) set(atom, JSON.parse(value).value)
  }
}

function myLookupOfAtomWithKey(key) {
  switch (key) {
    case isLightThemeState.key:
      return isLightThemeState
    default:
      return null
  }
}
