import React from 'react'
import cs from 'classnames'
import {DateTime, Info} from 'luxon'

import classes from './years-by-dow-table.module.scss'

const YEARS_INTO_THE_FUTURE = 10

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
        {Info.weekdays().map(dow => (
          <tr key={dow}>
            <th>{dow}</th>
            <YearsTableData years={yearsByDow[dow]} />
          </tr>
        ))}
      </table>
    </div>
  )
}

function YearsTableData({years}) {
  return <td>{years && years.length ? years.join(', ') : null}</td>
}

function findFutureDowsForDate(month, day, yearsIntoTheFuture) {
  let currentYear = new Date().getFullYear()

  let dows = []
  for (let i = 0; i <= yearsIntoTheFuture; ++i) {
    let yearForDow = currentYear + i
    var dt = DateTime.local(yearForDow, month, day)
    dows.push([dt.weekdayLong, yearForDow])
  }

  return dows
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
