import React, {useState, useEffect} from 'react'

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
            {Array(DAYS_IN_WEEK)
              .fill(null)
              .map((_, dow) => (
                <YearsTableData years={yearsByDow[dow]} />
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function YearsTableData({years}) {
  return <td>{years && years.length && years.join(', ')}</td>
}

const DAYS_IN_WEEK = 7

function findFutureDowsForDate(month, day, yearsIntoTheFuture) {
  let currentYear = new Date().getFullYear()

  let dows = []
  for (let i = 0; i <= yearsIntoTheFuture; ++i) {
    let yearForDow = currentYear + i
    let date = new Date(yearForDow, month, day)

    let startsOnSunday = date.getDay()
    let startsOnMonday = (startsOnSunday - 1 + DAYS_IN_WEEK) % DAYS_IN_WEEK

    console.log(yearForDow, startsOnMonday, indexToDow[startsOnMonday])
    dows.push([startsOnMonday, yearForDow])
  }

  return dows
}

function sortYearsByDow(futureDowsForDate) {
  return futureDowsForDate.reduce((accum, [dow, year]) => {
    if (!accum[dow]) accum[dow] = []
    accum[dow].push(year)
    return accum
  }, {})
}

let indexToDow = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]
