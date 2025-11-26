import { useRef, useState, useEffect } from 'react'

type Props = {
  isExpanded: boolean
  onClick: () => void
}

const NavButton = ({ isExpanded, onClick }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (containerRef.current) {
      // W = width of the button (and the horizontal bars)
      const W = containerRef.current.offsetWidth // 40px

      // Get the gap between bars from computed styles (Tailwind's gap-2 = 8px)
      const computedStyle = window.getComputedStyle(containerRef.current)
      const gap = parseFloat(computedStyle.gap) // 8px

      // Each bar is h-1 (4px tall), we measure from center of bar (half height = 2px)
      const barHeight = 2 // Half of h-1 = 2px

      // H = vertical distance from center of top bar to center of bottom bar
      // This forms the height of our right triangles
      // Path: half top bar + gap + full middle bar + gap + half bottom bar
      const H = barHeight + gap + barHeight + gap // 24px

      // Calculate rotation angle using inverse tangent (arctan)
      // In our right triangle: tan(θ) = opposite/adjacent = H/W
      // Therefore: θ = arctan(H/W)
      // Convert from radians to degrees: multiply by (180/π)
      const rotationDeg = Math.atan(H / W) * (180 / Math.PI)

      // Calculate scale factor using Pythagorean theorem
      // The hypotenuse length = √(W² + H²)
      // Scale = hypotenuse / original bar width
      // This stretches the bar to 
      const scaleFactor = Math.sqrt(W * W + H * H) / W

      setRotation(rotationDeg)
      setScale(scaleFactor)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-8 lg:w-10 flex flex-col gap-1.5 lg:gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div
        className="w-full h-0.5 bg-primary-text rounded-sm transition-all duration-500 ease-in-out origin-right"
        style={{
          transform: isExpanded
            ? `rotate(-${rotation}deg) scale(${scale})`
            : 'rotate(0deg) scale(1)'
        }}
      />
      <div
        className={`w-full h-0.5 bg-primary-text rounded-sm transition-all duration-500 ease-in-out
          ${isExpanded ? "opacity-0" : "opacity-100"}`}
      />
      <div
        className="w-full h-0.5 bg-primary-text rounded-sm transition-all duration-500 ease-in-out origin-right"
        style={{
          transform: isExpanded
            ? `rotate(${rotation}deg) scale(${scale})`
            : 'rotate(0deg) scale(1)'
        }}
      />
    </div>
  )
}
export default NavButton;