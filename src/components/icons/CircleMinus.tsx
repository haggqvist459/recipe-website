
type Props = {
  size?: string
}

const CircleMinus = ({ size = 'size-6' }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className={size}>
      <circle cx="12" cy="12" r="9" className="fill-primary stroke-primary-text" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9" className="stroke-primary-text" fill="none" />
    </svg>
  );
}

export default CircleMinus;