type Props = {
  onClick: () => void
  className?: string
  children: React.ReactNode
  disabled?: boolean
}

const IconButton = ({ onClick, className = '', children, disabled = false }: Props) => {
  return (
    <button type="button" disabled={disabled} className={`button-click ${className} disabled:opacity-50`} onClick={onClick}>
      {children}
    </button>
  )
}

export default IconButton