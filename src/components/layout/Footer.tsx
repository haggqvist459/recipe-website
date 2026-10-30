import { useState } from "react"
import { useLanguage } from "@/contexts"
import { translateText } from "@/shared"
import { Settings } from "../ui"
import { CogWheel } from "../icons"

const Footer = () => {

  const { language } = useLanguage()
  const [showSettings, setShowSettings] = useState(false)

  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (typeof window.navigator !== 'undefined' &&
      (window.navigator as any).standalone === true)

return (
    <footer id='footer' className={`bg-primary relative ${isStandalone ? 'h-15 pb-2' : 'h-9'}`}>
      <div className="absolute bottom-full w-full">
        <Settings handleClose={() => setShowSettings(!showSettings)} isOpen={showSettings} />
      </div>
      <div className="relative flex justify-center mt-2">
        <div
          className={`absolute left-5 transition-transform duration-300 ${showSettings ? '-rotate-180' : 'rotate-0'
            }`}
          onClick={() => setShowSettings(!showSettings)}
        >
          <CogWheel />
        </div>
        <a href="https://github.com/haggqvist459/ubiquitous-doodle" target='_blank' className='underline text-sm text-ceramic'>{translateText("footer", "codeGitHub", language)}</a>
      </div>
    </footer>
  )
}

export default Footer

// old footer
/*
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
        <a href="https://github.com/haggqvist459/ubiquitous-doodle" target='_blank' className='underline text-sm text-ceramic'>{translateText("footer", "codeGitHub", language)}</a>
      </div>
    </footer>
  )
*/

// new footer suggestion 
/*
  return (
    <footer id='footer' className={`bg-primary flex flex-col`}>
      <Settings handleClose={() => setShowSettings(!showSettings)} isOpen={showSettings} />
      <div className="grid grid-cols-3 items-center">
        <div
          className={`px-5 py-2 justify-self-start transition-transform duration-300 ${showSettings ? '-rotate-180' : 'rotate-0'}`}
          onClick={() => setShowSettings(!showSettings)}>
          <CogWheel />
        </div>
        <a href="https://github.com/haggqvist459/ubiquitous-doodle" target='_blank' className='underline mx-auto text-sm text-ceramic'>{translateText("footer", "codeGitHub", language)}</a>
      </div>
    </footer>
  )
*/