import Heading from "./Heading"
import { Close } from "../icons"
import { LANGUAGES, useLanguage } from "@/contexts"
import { translateText } from "@/shared"

type Props = {
  isOpen: boolean
  handleClose: () => void
}

const Settings = ({ isOpen, handleClose }: Props) => {

  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={`overflow-hidden px-5 w-full bg-primary transition-all duration-500 ease-in-out ${isOpen ? 'h-20' : 'h-0'}`}
      onClick={handleClose}
    >
      <div className="flex justify-between mt-2">
        <Heading title={translateText('settings', "title", language)} headingType="sub-heading" textColourOverride="text-white-text" />
        <div onClick={handleClose}>
          <Close colour="text-white-text"/>
        </div>
      </div>
      <div className="w-full flex justify-start space-x-2">
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            className={`py-2 font-light text-white-text ${language === code ? 'font-normal underline decoration-1' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Settings