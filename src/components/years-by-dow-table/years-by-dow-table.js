import React from 'react'
import cs from 'classnames'
import {DateTime, Info} from 'luxon'

import {YearsTableData} from './years-table-data'
import classes from './years-by-dow-table.module.scss'

export const YEARS_INTO_THE_FUTURE = 20

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
