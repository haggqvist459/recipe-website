type Props = {
  onClick: () => void
  className?: string
  children: React.ReactNode
}

const IconButton = ({ onClick, className = '', children }: Props) => {
  return (
    <button type="button" className={`button-click ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default IconButton