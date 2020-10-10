import React from 'react'
import {DateTime} from 'luxon'

export function YearsTableDescription({intMonth, intDay, ...rest}) {
  let dt = DateTime.fromObject({month: intMonth})

  return (
    <div {...rest}>
      <b>
        {dt.monthLong} {intDay}
        {getNumberSuffix(intDay)}
      </b>{' '}
      will fall on these days of the week in the upcoming years:
    </div>
  )
}

function getNumberSuffix(num) {
  const th = 'th'
  const rd = 'rd'
  const nd = 'nd'
  const st = 'st'

  if (num === 11 || num === 12 || num === 13) return th

  let lastDigit = num.toString().slice(-1)

  // prettier-ignore
  switch (lastDigit) {
    case '1': return st
    case '2': return nd
    case '3': return rd
    default:  return th
  }
}
