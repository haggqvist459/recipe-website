
type Props = {
  children: React.ReactNode
}

const PageContainer = ({
  children,
}: Props) => {


  return (
    <section className={`flex flex-col mx-auto w-full`}>
      {children}
    </section>
  )
}

export default PageContainer
