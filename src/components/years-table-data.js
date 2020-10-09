import React from 'react'
import {DateTime} from 'luxon'
import chroma from 'chroma-js'

import {YEARS_INTO_THE_FUTURE} from './years-by-dow-table'

export function YearsTableData({years}) {
  let thisYear = DateTime.local().year
  let maxYear = thisYear + YEARS_INTO_THE_FUTURE

  function scaleFontsize(year) {
    let yearsInFuture = year - thisYear
    let fontSize = 1.5 - yearsInFuture * 0.1
    let bounded = Math.max(0.75, fontSize)
    return bounded + 'em'
  }

  let scaleColor = chroma
    .scale([getCssVariable('primary'), getCssVariable('off-bg')])
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
