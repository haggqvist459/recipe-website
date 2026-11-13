import { ReactNode } from 'react'

type Props = {
  isActive: boolean
  onClick: () => void
  children: ReactNode
}

const HorizontalMenuButton = ({ isActive, onClick, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`text-primary-text ${isActive ? "underline decoration-1" : "font-light"}`}
    >
      {children}
    </button>
  )
}

export default HorizontalMenuButton