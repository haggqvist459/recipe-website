
type Props = {
  children: React.ReactNode;
};


const SectionWrapper = ({ children }: Props) => {
  return (
    <section className="w-full flex flex-col gap-2 rounded-lg border border-marblewhite p-3 bg-ceramic"> 
      {children}
    </section>
  );
}

export default SectionWrapper;