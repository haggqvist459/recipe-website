type Props = {
  title: string,
  headingType?: 'section-heading' | 'main-heading' | 'sub-heading' | 'small-heading'
  textColourOverride?: string
}

const Heading = ({
  title,
  headingType = 'main-heading',
  textColourOverride = ''
}: Props) => {
  return (
    <h3 className={`${headingType} ${textColourOverride}`}>
      {title || '\u00A0'}
    </h3>
  )
}

export default Heading;