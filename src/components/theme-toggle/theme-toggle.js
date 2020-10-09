import React, {useState} from 'react'

import {SunMoonIcon} from './sun-moon-icon'

export function ThemeToggle() {
  const [showLightTheme, setShowLightTheme] = useState(true)

  return (
    <SunMoonIcon
      showSun={showLightTheme}
      onClick={() => setShowLightTheme(light => !light)}
    />
  )
}
