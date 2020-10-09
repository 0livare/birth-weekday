import React, {useState, useEffect} from 'react'
import {DateTime} from 'luxon'
import chroma from 'chroma-js'
import {useRecoilState} from 'recoil'

import {isLightThemeState} from '../state'
import {YEARS_INTO_THE_FUTURE} from './years-by-dow-table'

export function YearsTableData({years}) {
  const [isLightTheme] = useRecoilState(isLightThemeState)
  const [colorScale, setColorScale] = useState({start: 'white', end: 'black'})

  useEffect(() => {
    setColorScale({
      start: getCssVariable('primary'),
      end: getCssVariable('off-bg'),
    })
  }, [isLightTheme])

  let thisYear = DateTime.local().year
  let maxYear = thisYear + YEARS_INTO_THE_FUTURE

  function scaleFontsize(year) {
    let yearsInFuture = year - thisYear
    let fontSize = 1.5 - yearsInFuture * 0.1
    let bounded = Math.max(0.75, fontSize)
    return bounded + 'em'
  }

  let scaleColor = chroma
    .scale([colorScale.start, colorScale.end])
    .domain([thisYear, maxYear])

  return (
    <td>
      {years &&
        years.map((year, i) => (
          <span
            key={year}
            style={{color: scaleColor(year), fontSize: scaleFontsize(year)}}
          >
            {year}
            {years.length > i + 1 ? ', ' : ''}
          </span>
        ))}
    </td>
  )
}

function getCssVariable(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--' + name)
    .trim()
}
