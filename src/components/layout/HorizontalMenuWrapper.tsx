import { useState, useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode,
  lgHidden?: boolean
  justify?: 'justify-start' | 'justify-center' | 'justify-end'
  bg?: string
}

const HorizontalMenuWrapper = ({ children, lgHidden = false, justify = 'justify-center', bg = 'bg-marblewhite' }: Props) => {

  const containerRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const hasOverflow = containerRef.current.scrollWidth > containerRef.current.clientWidth
        setIsOverflowing(hasOverflow)
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [children])

  return (
    <div className={`relative h-9 w-full ${bg} overflow-hidden animate-roll-down ${lgHidden ? 'lg:hidden' : ''}`}>
      <div className={`h-9 flex items-center ${justify} space-x-5 font-medium overflow-y-auto`}>
        {children}
      </div>
      {isOverflowing &&
        <>
          <div className="md:hidden pointer-events-none absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-marblewhite/90 to-transparent" />
          <div className="md:hidden pointer-events-none absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-marblewhite/90 to-transparent" />
        </>
      }

    </div>
  )
}

export default HorizontalMenuWrapper