import React from 'react'
import {DateTime, Info} from 'luxon'

import classes from './years-by-dow-table.module.scss'

const YEARS_INTO_THE_FUTURE = 10

export function YearsByDowTable({month, day}) {
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
    <div className={classes.root}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {Info.weekdays().map(dow => (
              <YearsTableData key={dow} years={yearsByDow[dow]} />
            ))}
          </tr>
        </tbody>
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
