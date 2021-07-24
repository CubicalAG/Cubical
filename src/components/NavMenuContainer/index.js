import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { animated, useSpring } from 'react-spring'
import useMeasure from 'react-use-measure'
import { ResizeObserver } from '@juggle/resize-observer'

import styles from './nav-menu-container.module.scss'

const NavMenuContainer = ({ children, navMenuContainerAnimationRef }) => {
  const [ref, { height }] = useMeasure({ polyfill: ResizeObserver })

  const pageLoaded = useSelector((state) => state.pageLoaded)
  const pageLoadedMinimal = useSelector((state) => state.pageLoadedMinimal)

  const vhToPixel = (value) => `${typeof window != 'undefined' && (window.innerHeight * value) / 100}px`

  const props = useSpring({
    height: pageLoaded ? `${height}px` : vhToPixel(100),
    config: {
      duration: 200,
    },
    ref: navMenuContainerAnimationRef,
  })

  const dispatch = useDispatch()

  if (typeof window != 'undefined') {
    window.addEventListener('scroll', () => {
      dispatch({ type: 'SCROLL_FROM_TOP_CHANGE', payload: window.pageYOffset })
    })
  }

  let pageOffset = useSelector((state) => state.scrollFromTop)

  let backgroundHandler = () => {
    if (pageOffset < 5) {
      return 0
    } else if (pageOffset > 95) {
      return 1
    } else {
      return pageOffset / 100
    }
  }

  return (
    <animated.nav style={props} className={styles.primaryMenu}>
      <div className={styles.relativeMenu}>
        <div ref={ref} className={styles.menuContainer}>
          {children}
        </div>
      </div>
    </animated.nav>
  )
}

export default NavMenuContainer
