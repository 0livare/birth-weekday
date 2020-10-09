import React, {useEffect, useState} from 'react'
import cs from 'classnames'
import {useRecoilState} from 'recoil'

import {isLightThemeState} from '../../state'
import {SunMoonIcon} from './sun-moon-icon'
import classes from './theme-toggle.module.scss'

export function ThemeToggle({className, ...rest}) {
  const [isLightTheme, setIsLightTheme] = useRecoilState(isLightThemeState)

  useEffect(() => {
    if (isLightTheme) return

    let html = document.documentElement
    html.classList.add('dark-theme')
    return () => html.classList.remove('dark-theme')
  }, [isLightTheme])

  return (
    <SunMoonIcon
      {...rest}
      className={cs(className, classes.themeToggle, {
        [classes.dark]: !isLightTheme,
      })}
      showSun={isLightTheme}
      onClick={() => setIsLightTheme(light => !light)}
    />
  )
}
