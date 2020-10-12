import React, {useLayoutEffect} from 'react'
import cs from 'classnames'
import {useRecoilState} from 'recoil'

import {isLightThemeState} from '../../state'
import {SunMoonIcon} from './sun-moon-icon'
import classes from './theme-toggle.module.scss'

export function ThemeToggle({className, ...rest}) {
  const [isLightTheme, setIsLightTheme] = useRecoilState(isLightThemeState)

  useLayoutEffect(() => {
    if (isLightTheme) return

    let html = document.documentElement
    html.classList.add('dark-theme')
    return () => html.classList.remove('dark-theme')
  }, [isLightTheme])

  return (
    <div className={cs(className, classes.themeToggle)}>
      <SunMoonIcon
        {...rest}
        showSun={isLightTheme}
        onClick={() => setIsLightTheme(light => !light)}
      />
    </div>
  )
}
