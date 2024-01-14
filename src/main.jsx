import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { Provider } from 'react-redux'
import store from './store'

const root = document.getElementById('root')

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
)

import { useRef, useEffect } from 'react'

export function useHorizontalScroll(speedFactor = 1) {
  const elRef = useRef()

  useEffect(() => {
    const el = elRef.current
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return
        e.preventDefault()
        el.scrollTo({
          left: el.scrollLeft - e.deltaY * speedFactor,
          behavior: 'smooth',
        })
      }
      el.addEventListener('wheel', onWheel)
      return () => el.removeEventListener('wheel', onWheel)
    }
  }, [])

  return elRef
}
