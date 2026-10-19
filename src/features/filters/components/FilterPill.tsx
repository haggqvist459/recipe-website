type Props = {
  text: string,
  backgroundColour: string
}
const FilterPill = ({text, backgroundColour}: Props) => {
  return (
    <div className={`${backgroundColour} rounded-4xl px-3 py-1`}>
      <span className="uppercase text-sm font-semibold">{text}</span>
    </div>
  )
}

export default FilterPill