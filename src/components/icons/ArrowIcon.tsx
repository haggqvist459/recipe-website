
type Props = {
  strokeWidth?: number
  colour?: string
}


const ArrowIcon = ({ strokeWidth = 2, colour = 'text-primary-text' }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={`size-6 ${colour}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

export default ArrowIcon;


