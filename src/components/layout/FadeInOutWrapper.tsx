import { useState, useEffect } from 'react';

type Props = {
  isVisible: boolean
  children: React.ReactNode
  duration?: number
};

const FadeInOutWrapper = ({ isVisible, children, duration = 300 }: Props) => {
  const [shouldRender, setShouldRender] = useState(isVisible)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      const timeout = setTimeout(() => setShouldRender(false), duration)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, duration])

  if (!shouldRender) return null

  return (
    <div
      className={`transition-opacity ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

export default FadeInOutWrapper;