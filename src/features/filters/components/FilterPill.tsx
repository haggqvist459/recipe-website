type Props = {
  text: string,
  backgroundColour: string
}
const FilterPill = ({text, backgroundColour}: Props) => {
  return (
    <div className={`${backgroundColour} rounded-full px-2 py-0.5`}>
      <span className="uppercase text-xs font-semibold text-white">{text}</span>
    </div>
  )
}

export default FilterPill