import { useEffect, useState } from 'react'

export const useStyle = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return width > 920 ? 'pc' : 'mobile'
}
