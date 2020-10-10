import React, {useEffect, useRef} from 'react'
import Head from 'next/head'

import {BirthTextField, YearsByDowTable, ThemeToggle} from '@/components'
import {useQueryParams} from '@/hooks'
import classes from './index.module.scss'

export default function Home() {
  const [month, setMonth] = useQueryParams('m')
  const [day, setDay] = useQueryParams('d')

  const monthInputRef = useRef()
  const dayInputRef = useRef()

  useEffect(() => {
    if (month.length < 2 && !day.length) {
      monthInputRef.current.focus()
    } else if (day.length < 2) {
      dayInputRef.current.focus()
    }
  })

  return (
    <div className={classes.root}>
      <Head>
        <title>Birth Weekday</title>
      </Head>
      <ThemeToggle />
      <h1 className={classes.title}>What day is your birthday on?</h1>
      <div>
        <div className={classes.birthdayEntry}>
          <BirthTextField
            id='month'
            text={month}
            onTextChange={setMonth}
            label='Month'
            inputRef={monthInputRef}
            placeholder='10'
          />
          <BirthTextField
            id='day'
            text={day}
            onTextChange={setDay}
            label='Day'
            inputRef={dayInputRef}
            placeholder='31'
          />
        </div>

        <YearsByDowTable month={month} day={day} className={classes.table} />
      </div>
    </div>
  )
}
