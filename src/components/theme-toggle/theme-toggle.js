import React, {useEffect, useState} from 'react'
import cs from 'classnames'

import {SunMoonIcon} from './sun-moon-icon'
import classes from './theme-toggle.module.scss'

export function ThemeToggle({className, ...rest}) {
  const [showLightTheme, setShowLightTheme] = useState(true)

  useEffect(() => {
    if (showLightTheme) return

    let html = document.documentElement
    html.classList.add('dark-theme')
    return () => html.classList.remove('dark-theme')
  }, [showLightTheme])

  return (
    <SunMoonIcon
      {...rest}
      className={cs(className, classes.themeToggle, {
        [classes.dark]: !showLightTheme,
      })}
      showSun={showLightTheme}
      onClick={() => setShowLightTheme(light => !light)}
    />
  )
}
