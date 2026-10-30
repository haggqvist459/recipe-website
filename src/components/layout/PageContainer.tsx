
type Props = {
  children: React.ReactNode
}

const PageContainer = ({
  children,
}: Props) => {


  return (
    <section className={`flex flex-col mx-auto w-full flex-1 min-h-0`}>
      {children}
    </section>
  )
}

export default PageContainer
