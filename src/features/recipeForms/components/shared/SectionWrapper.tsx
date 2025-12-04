
type Props = {
  children: React.ReactNode;
};


const SectionWrapper = ({ children }: Props) => {
  return (
    <section className="w-full flex flex-col gap-2 rounded inset-shadow-xs/15 shadow-sm/15 p-3 bg-white"> 
      {children}
    </section>
  );
}

export default SectionWrapper;