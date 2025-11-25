import { useState } from "react";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils/";
import { Settings, CogWheel } from "@/components/";

const Footer = () => {

  const { language } = useLanguage();
  const [showSettings, setShowSettings] = useState(false)

  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (typeof window.navigator !== 'undefined' &&
      (window.navigator as any).standalone === true);

  return (
    <footer id='footer' className={`bg-primary relative ${isStandalone ? 'h-15 pb-2' : 'h-10'}`}>
      <div className="absolute bottom-full w-full">
        <Settings handleClose={() => setShowSettings(!showSettings)} isOpen={showSettings} />
      </div>
      <div className="relative flex items-center justify-center mt-2">
        <div
          className={`absolute left-5 transition-transform duration-300 ${showSettings ? '-rotate-180' : 'rotate-0'
            }`}
          onClick={() => setShowSettings(!showSettings)}
        >
          <CogWheel />
        </div>
        <a href="https://github.com/haggqvist459/ubiquitous-doodle" target='_blank' className='underline text-sm text-primary-text'>{translateText("footer", "codeGitHub", language)}</a>
      </div>

    </footer>
  )
}

export default Footer;