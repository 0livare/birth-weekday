import React from 'react'
import cs from 'classnames'
import {DateTime, Info} from 'luxon'
import chroma from 'chroma-js'

import classes from './years-by-dow-table.module.scss'

const YEARS_INTO_THE_FUTURE = 20

export function YearsByDowTable({month, day, className}) {
  if (!month || !day) return null

  let intMonth = parseInt(month)
  let intDay = parseInt(day)
  if (!intMonth || !intDay) return

  let futureDowsForDate = findFutureDowsForDate(
    intMonth,
    intDay,
    YEARS_INTO_THE_FUTURE,
  )

  let yearsByDow = sortYearsByDow(futureDowsForDate)

  return (
    <div className={cs(classes.root, className)}>
      <table className={classes.table}>
        <tbody>
          {Info.weekdays().map(dow => (
            <tr key={dow}>
              <th>{dow}</th>
              <YearsTableData years={yearsByDow[dow]} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function YearsTableData({years}) {
  let thisYear = DateTime.local().year
  let maxYear = thisYear + YEARS_INTO_THE_FUTURE

  let primary = getCssVariable('primary')
  let bg = getCssVariable('bg')
  let scale = chroma
    .scale(['#1565c0', 'rgb(241, 241, 241)'])
    .domain([thisYear, maxYear])

  return (
    <td>
      {years &&
        years.map((year, i) => (
          <span key={year} style={{color: scale(year)}}>
            {year}
            {years.length > i + 1 ? ', ' : ''}
          </span>
        ))}
    </td>
  )
}

function findFutureDowsForDate(month, day, yearsIntoTheFuture) {
  let bdayThisYear = DateTime.local().set({month, day})

  return Array(yearsIntoTheFuture + 1) // +1 for the current year
    .fill(null)
    .map((_, i) => {
      let futureBday = bdayThisYear.plus({years: i})
      return [futureBday.weekdayLong, futureBday.year]
    })
}

function sortYearsByDow(futureDowsForDate) {
  let obj = Info.weekdays().reduce((accum, weekday) => {
    accum[weekday] = []
    return accum
  }, {})

  for (let [dow, year] of futureDowsForDate) {
    obj[dow].push(year)
  }

  return obj
}

function getCssVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(
    '--' + name,
  )
}
