import { MetaDataSection, IngredientSection, InstructionSection, PreviewSection } from "../sections"
import { useRecipeFormHandlers } from "../../hooks"
import { useLanguage } from "@/contexts"
import { translateText } from "@/shared"
import { Heading } from "@/components/ui"


type Props = {
  recipeId: string
}


const EditRecipeDesktop = ({ recipeId }: Props) => {

  const { language } = useLanguage()
  const { handleUpdate } = useRecipeFormHandlers(recipeId)


  return (
    <form onSubmit={handleUpdate} id="edit-recipe-form" className="flex flex-col min-h-0">
      <div className="flex justify-between p-5 border-b border-marblewhite">
        <Heading title="Change Recipe" headingType="section-heading"/>
        <button
          type="submit"
          form="edit-recipe-form"
          className="w-1/5 bg-primary font-medium rounded border-primary border-2 text-ceramic hover:border-ceramic button-click"
        >
          {translateText('buttons', 'submit', language)}
        </button>
      </div>
      <div className="flex min-h-0">
        <div className="w-3/5 overflow-y-auto space-y-5 px-5 my-5">
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

export default EditRecipeDesktop

