
type Props = {
  size?: string
}

const CirclePlus = ({ size = 'size-6' }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className={size}>
      <circle cx="12" cy="12" r="9" className="fill-lightred stroke-tertiary stroke-1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" className="stroke-tertiary" fill="none" />
    </svg>
  )
}

export default CirclePlus