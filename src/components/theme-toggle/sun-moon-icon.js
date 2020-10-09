import React from 'react'

export function SunMoonIcon({showSun, ...rest}) {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      style={{
        transform: `rotate(${showSun ? 90 : 40}deg)`,
      }}
      {...rest}
    >
      <mask id='moon-mask'>
        <rect x='0' y='0' width='18' height='18' fill='#FFF'></rect>
        <circle
          cx={showSun ? 25 : 10}
          cy={showSun ? 0 : 2}
          r='8'
          fill='black'
        ></circle>
      </mask>
      <circle
        cx='9'
        cy='9'
        fill='currentColor'
        mask='url(#moon-mask)'
        r={showSun ? 5 : 8}
      ></circle>
      {/* prettier-ignore */}
      <g>
        <SunRay isOpen={showSun} cx='17' cy='9' />
        <SunRay isOpen={showSun} cx='13' cy='15.928203230275509' />
        <SunRay isOpen={showSun} cx='5.000000000000002' cy='15.92820323027551' />
        <SunRay isOpen={showSun} cx='1' cy='9.000000000000002' />
        <SunRay isOpen={showSun} cx='4.9999999999999964' cy='2.071796769724492' />
        <SunRay isOpen={showSun} cx='13' cy='2.0717967697244912' />
      </g>
    </svg>
  )
}

function SunRay({isOpen, cx, cy}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r='1.5'
      fill='currentColor'
      style={{
        transformOrigin: 'center center',
        transform: `scale(${isOpen ? 1 : 0})`,
      }}
    ></circle>
  )
}
