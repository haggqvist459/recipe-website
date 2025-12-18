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
  const [isLargeScreen, setIsLargeScreen] = useState(
    () => window.matchMedia('(min-width: 1024px)').matches
  );

  useEffect(() => {
    const handler = () => setIsLargeScreen(window.matchMedia('(min-width: 1024px)').matches);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => setShouldShow(true), fadeDuration);
      return () => clearTimeout(timeout);
    } else {
      setShouldShow(false);
    }
  }, [isActive, fadeDuration]);

  return (
    <div className={`${lgWidth} ${isLargeScreen ? 'block' : ''}`}>
      {isLargeScreen ? (
        children
      ) : (
        <FadeInOutWrapper isVisible={shouldShow} duration={fadeDuration}>
          {children}
        </FadeInOutWrapper>
      )}
    </div>
  );
};

export default ResponsiveSection;