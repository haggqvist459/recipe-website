import { useEffect, useRef, useState } from "react"
import { Heading } from "../ui"

type Props = {
  isExpanded: boolean
  children: React.ReactNode
  title: string
  toggleExpansion: (isExpanded: boolean) => void
}

const ExpandableSection = ({
  isExpanded = false,
  children,
  title,
  toggleExpansion
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, children])

  return (
    <div className="mb-1 pb-1 border-b border-secondary-text">
      <div className="flex flex-row space-x-2 mt-2">
        <button
          type="button"
          onClick={() => toggleExpansion(!isExpanded)}
          className="flex flex-row items-center justify-between w-full text-left focus:outline-none"
        >
          <Heading title={title} headingType="sub-heading" />

          <span
            className={`text-primary-text font-sans inline-block transition-transform ${
              isExpanded ? "rotate-90" : "rotate-0"
            }`}
          >
            ▶
          </span>
        </button>
      </div>

      <div
        ref={contentRef}
        className="overflow-hidden transition-[height,opacity] duration-500 ease-in-out"
        style={{
          height: `${height}px`,
          opacity: isExpanded ? 1 : 0
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default ExpandableSection