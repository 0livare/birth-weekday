import React from 'react'
import {useSpring, animated} from 'react-spring'

export function SunMoonIcon({showSun, ...rest}) {
  const size = 18

  const rotationSpring = useSpring({
    from: {transform: `rotate(${90}deg)`},
    to: {transform: `rotate(${showSun ? 90 : 40}deg)`},
  })

  const maskRadiusSpring = useSpring({
    from: {
      cx: 25,
      cy: 0,
    },
    to: {
      cx: showSun ? 25 : 10,
      cy: showSun ? 0 : 2,
    },
  })

  const planetRadiusSpring = useSpring({
    from: {r: 5},
    to: {r: showSun ? 5 : 8},
  })

  return (
    <animated.svg
      viewBox={`0 0 ${size} ${size}`}
      style={rotationSpring}
      {...rest}
    >
      <mask id='moon-mask'>
        <rect x='0' y='0' width={size} height={size} fill='white'></rect>
        <animated.circle
          cx={maskRadiusSpring.cx}
          cy={maskRadiusSpring.cy}
          r='8'
          fill='black'
        ></animated.circle>
      </mask>
      <animated.circle
        cx={size / 2}
        cy={size / 2}
        fill='currentColor'
        mask='url(#moon-mask)'
        r={planetRadiusSpring.r}
      ></animated.circle>
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
    </animated.svg>
  )
}

function SunRay({isOpen, theta, size}) {
  const spring = useSpring({
    from: {transform: 'scale(1)'},
    to: {transform: `scale(${isOpen ? 1 : 0})`},
  })

  const rayRadius = 1.5
  const rFromCenter = size / 2 - rayRadius

  const x = rFromCenter * cos(theta)
  const y = rFromCenter * sin(theta)

  // Convert from cartesian coordinates (4 quadrants)
  // to SVG coordinates (4th quadrant, 0,0 is top left)
  const cx = x + size / 2
  const cy = y + size / 2

  return (
    <animated.circle
      cx={cx}
      cy={cy}
      r={rayRadius}
      fill='currentColor'
      style={{
        transformOrigin: 'center center',
        ...spring,
      }}
    ></animated.circle>
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
