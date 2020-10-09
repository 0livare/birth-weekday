import React from 'react'

export function SunMoonIcon({showSun, ...rest}) {
  const size = 18

  return (
    <svg
      width='100'
      height='100'
      viewBox={`0 0 ${size} ${size}`}
      style={{
        transform: `rotate(${showSun ? 90 : 40}deg)`,
      }}
      {...rest}
    >
      <mask id='moon-mask'>
        <rect x='0' y='0' width={size} height={size} fill='white'></rect>
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
      <g>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <SunRay
              key={index}
              isOpen={showSun}
              size={size}
              theta={60 * index}
            />
          ))}
      </g>
    </svg>
  )
}

function SunRay({isOpen, theta, size}) {
  const rayRadius = 1.5
  const rFromCenter = size / 2 - rayRadius

  const x = rFromCenter * cos(theta)
  const y = rFromCenter * sin(theta)

  // Convert from cartesian coordinates (4 quadrants)
  // to SVG coordinates (4th quadrant, 0,0 is top left)
  const cx = x + size / 2
  const cy = y + size / 2

  return (
    <circle
      cx={cx}
      cy={cy}
      r={rayRadius}
      fill='currentColor'
      style={{
        transformOrigin: 'center center',
        transform: `scale(${isOpen ? 1 : 0})`,
      }}
    ></circle>
  )
}

function sin(deg) {
  return Math.sin(degToRad(deg))
}

function cos(deg) {
  return Math.cos(degToRad(deg))
}

function degToRad(deg) {
  return (deg * Math.PI) / 180
}
