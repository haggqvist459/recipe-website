// components/layout/ResponsiveSection.tsx
import { ReactNode, useState, useEffect } from 'react';
import { FadeInOutWrapper } from '@/components';

type Props = {
  isActive: boolean;
  lgWidth?: string;
  fadeDuration?: number;
  children: ReactNode;
};

const ResponsiveSection = ({
  isActive,
  lgWidth = 'lg:w-1/3',
  fadeDuration = 150,
  children
}: Props) => {
  const [shouldShow, setShouldShow] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      // Delay showing new section until previous has faded out
      const timeout = setTimeout(() => setShouldShow(true), fadeDuration);
      return () => clearTimeout(timeout);
    } else {
      setShouldShow(false);
    }
  }, [isActive, fadeDuration]);

  return (
    <div className={`${lgWidth} lg:block`}>
      <div className="lg:hidden">
        <FadeInOutWrapper isVisible={shouldShow} duration={fadeDuration}>
          {children}
        </FadeInOutWrapper>
      </div>

      <div className="hidden lg:block">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveSection;