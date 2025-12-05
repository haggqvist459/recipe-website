import React from "react";

type Props = {
  children: React.ReactNode,
  lgHidden?: boolean
}

const HorizontalMenuWrapper = ({ children, lgHidden = false }: Props) => {
  return (
    <div className={`relative h-9 px-5 bg-primary flex items-center justify-start space-x-5 font-medium overflow-y-auto ${lgHidden ? 'lg:hidden' : ''}`}>
      {children}
      <div className="md:hidden pointer-events-none absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-primary/90 to-transparent" />
      <div className="md:hidden pointer-events-none absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-primary/90 to-transparent" />
    </div>
  );
}

export default HorizontalMenuWrapper;