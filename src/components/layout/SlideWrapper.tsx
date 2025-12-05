import { useEffect, useState } from 'react';

type Slide = {
  key: string,
  component: React.ReactElement,
};

type Props = {
  activeKey: string,
  slides: Slide[],
  allowSwipe?: boolean,
  onSwipe?: (newKey: string) => void
};

type Phase = 'idle' | 'exiting' | 'entering';

const SlideWrapper = ({ activeKey, slides, allowSwipe = false, onSwipe }: Props) => {
  const [displayedKey, setDisplayedKey] = useState(activeKey);
  const [phase, setPhase] = useState<Phase>('idle');
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Set direction and start exit animation when key changes
  useEffect(() => {
    if (activeKey !== displayedKey) {
      const prevIndex = slides.findIndex(s => s.key === displayedKey);
      const nextIndex = slides.findIndex(s => s.key === activeKey);
      setDirection(nextIndex > prevIndex ? 'right' : 'left');
      setPhase('exiting');
    }

  }, [activeKey, displayedKey, slides]);

  // Handle exit animation end: show entering component
  const handleExitAnimationEnd = () => {
    setDisplayedKey(activeKey);
    setPhase('entering');
  };

  // Handle enter animation end: finish animation
  const handleEnterAnimationEnd = () => {
    setPhase('idle');
  };

  // Decide which slide to show and which animation
  let slideKey = displayedKey;
  let animationClass = '';

  if (phase === 'exiting') {
    animationClass =
      direction === 'right'
        ? 'animate-slide-out-to-left'
        : 'animate-slide-out-to-right';
  } else if (phase === 'entering') {
    slideKey = activeKey;
    animationClass =
      direction === 'right'
        ? 'animate-slide-in-from-right'
        : 'animate-slide-in-from-left';
  }

  const onTouchStart = (e: React.TouchEvent) => {
    if (!allowSwipe) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!allowSwipe) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!allowSwipe || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const currentIndex = slides.findIndex(s => s.key === activeKey);

    if (distance > 50 && currentIndex < slides.length - 1) {
      onSwipe?.(slides[currentIndex + 1].key);
    }

    if (distance < -50 && currentIndex > 0) {
      onSwipe?.(slides[currentIndex - 1].key);
    }
  };


  const slide = slides.find(s => s.key === slideKey);

  return (
    <div
      className="relative w-full overflow-x-hidden min-h-[300px]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        key={slide?.key}
        className={`p-2 transition-transform duration-300 ${animationClass}`}
        style={{ overflowY: 'auto', height: '100%', minHeight: 0 }}
        onAnimationEnd={
          phase === 'exiting'
            ? handleExitAnimationEnd
            : phase === 'entering'
              ? handleEnterAnimationEnd
              : undefined
        }
      >
        {slide?.component}
      </div>
    </div>
  );
};

export default SlideWrapper;