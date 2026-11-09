
import { MetaDataSection, IngredientSection, InstructionSection, PreviewSection } from "../sections"
import { useRecipeFormHandlers } from "../../hooks"
import { useLanguage } from "@/contexts"
import { translateText } from "@/shared"
import { Heading } from "@/components/ui"

const CreateRecipeDesktop = () => {


  const { language } = useLanguage()
  const { handleSubmit } = useRecipeFormHandlers()

  return (
    <form onSubmit={handleSubmit} id="create-recipe-form" className="flex flex-col min-h-0">
      <div className="flex justify-between p-5">
        <Heading title="Create Recipe" headingType="section-heading" />
        <button
          type="submit"
          form="create-recipe-form"
          className="w-1/5 bg-primary font-medium rounded border-primary border-2 text-ceramic hover:border-ceramic button-click"
        >
          {translateText('buttons', 'submit', language)}
        </button>
      </div>
      <div className="flex min-h-0">
        <div className="w-3/5 overflow-y-auto px-5 my-5 space-y-5">
          <MetaDataSection />
          <IngredientSection />
          <InstructionSection />
        </div>
        <div className="w-2/5 overflow-y-auto px-5 my-5">
          <PreviewSection />
        </div>
      </div>
    </form>
  )
}

export default CreateRecipeDesktop
