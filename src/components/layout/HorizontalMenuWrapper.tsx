import React from "react";

type Props = {
  children: React.ReactNode,
  lgHidden?: boolean
  justify?: 'justify-start' | 'justify-center' | 'justify-end'
}

const HorizontalMenuWrapper = ({ children, lgHidden = false, justify='justify-center' }: Props) => {
  return (
    <div className="relative h-9">
      <div className={`px-5 h-9 bg-primary flex items-center space-x-5 font-medium overflow-y-auto ${justify} ${lgHidden ? 'lg:hidden' : ''}`}>
        {children}
      </div>
      <div className="md:hidden pointer-events-none absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-primary/100 to-transparent" />
      <div className="md:hidden pointer-events-none absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-primary/100 to-transparent" />
    </div>
  );
}

export default HorizontalMenuWrapper;