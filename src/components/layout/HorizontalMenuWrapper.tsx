import React from "react";

type Props = {
  children: React.ReactNode,
  lgHidden?: boolean
}

const HorizontalMenuWrapper = ({ children, lgHidden = false}: Props) => {
  return (
    <div className={`h-9 bg-primary flex items-center justify-center space-x-5 font-medium ${lgHidden ? 'lg:hidden' : ''}`}>
      {children}
    </div>
  );
}

export default HorizontalMenuWrapper;