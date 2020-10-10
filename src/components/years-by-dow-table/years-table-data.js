import React from 'react'
import {DateTime} from 'luxon'

export function YearsTableData({years}) {
  let thisYear = DateTime.local().year

  function scaleFontsize(year) {
    let yearsInFuture = year - thisYear
    let fontSize = 1.5 - yearsInFuture * 0.1
    let bounded = Math.max(0.75, fontSize)
    return bounded + 'em'
  }

  function scaleOpacity(year) {
    let yearsInFuture = year - thisYear
    let opacity = 1 - yearsInFuture * 0.03
    let bounded = Math.max(0.45, opacity)
    return bounded
  }

  return (
    <td>
      {years &&
        years.map((year, i) => (
          <span
            key={year}
            style={{opacity: scaleOpacity(year), fontSize: scaleFontsize(year)}}
          >
            {year}
            {years.length > i + 1 ? ', ' : ''}
          </span>
        ))}
    </td>
  )
}
