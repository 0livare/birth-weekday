import React from 'react'

import classes from './birth-text-field.module.scss'

export function BirthTextField({
  text,
  onTextChange,
  id,
  label,
  inputRef,
  placeholder,
}) {
  return (
    <div className={classes.root}>
      <div className={classes.inputWrapper}>
        <input
          type='text'
          id={id}
          className={classes.input}
          value={text}
          onChange={e => onTextChange(e.target.value)}
          ref={inputRef}
          placeholder={placeholder}
        />
      </div>

      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
    </div>
  )
}
