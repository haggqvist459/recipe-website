type Props = {
  colour?: string
  size?: string
}


const Close = ({ colour = 'text-primary-text', size = 'size-6' }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${size} ${colour}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>

  )
}

export default Close
