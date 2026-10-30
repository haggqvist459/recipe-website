import { useState } from "react"
import { PageContainer, HorizontalMenuWrapper, ResponsiveWrapper } from "@/components/layout"
import { HorizontalMenuButton } from "@/components/ui"
import { RecipeManagementList } from "@/features/recipes/recipeManagement"
import { FilterManagement } from "@/features/filters"
import { useLanguage } from "@/contexts"
import { translateText } from "@/shared"

const AdminPage = () => {

  const { language } = useLanguage()
  const [activeSection, setActiveSection] = useState<"recipes" | "filters">("recipes")


  return (
    <PageContainer>
      <HorizontalMenuWrapper lgHidden={true}>
        <HorizontalMenuButton isActive={activeSection === 'recipes'} onClick={() => setActiveSection('recipes')}>
          {translateText('adminPage', 'recipes', language)}
        </HorizontalMenuButton>
        <HorizontalMenuButton isActive={activeSection === 'filters'} onClick={() => setActiveSection('filters')}>
          {translateText('adminPage', 'filters', language)}
        </HorizontalMenuButton>
      </HorizontalMenuWrapper>
      <div className="lg:flex lg:overflow-hidden">
        <div className="w-full lg:w-2/3 max-h-[100dvh] overflow-y-auto">
          <ResponsiveWrapper isActive={activeSection === 'recipes'}>
            <RecipeManagementList />
          </ResponsiveWrapper>
        </div>
        <div className="w-full lg:w-1/3 max-h-[100dvh] overflow-y-auto">
          <ResponsiveWrapper isActive={activeSection === 'filters'}>
            <FilterManagement />
          </ResponsiveWrapper>
        </div>
      </div>
    </PageContainer>
  )
}

export default AdminPage

