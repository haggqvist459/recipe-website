
type Props = {
  children: React.ReactNode
}

const PageContainer = ({
  children,
}: Props) => {


  return (
    <section className={``}>
      {children}
    </section>
  )
}

export default PageContainer
