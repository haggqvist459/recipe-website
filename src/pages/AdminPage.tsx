import { useState } from "react"
import { PageContainer, HorizontalMenuWrapper, HorizontalMenuButton } from "@/components"
import { RecipeManagementList } from "@/features/recipes/recipeManagement"
import { FilterManagement } from "@/features/filters"
import { useLanguage } from "@/contexts"
import { translateText } from "@/utils"

const AdminPage = () => {

  const { language } = useLanguage()
  const [activeSection, setActiveSection] = useState<"recipes" | "filters">("recipes")
  

  return (
    <PageContainer>
      <HorizontalMenuWrapper>
        <HorizontalMenuButton isActive={activeSection === 'recipes'} onClick={() => setActiveSection('recipes')}>
          {translateText('adminPage', 'recipes', language)}
        </HorizontalMenuButton>
        <HorizontalMenuButton isActive={activeSection === 'filters'} onClick={() => setActiveSection('filters')}>
          {translateText('adminPage', 'filters', language)}
        </HorizontalMenuButton>
      </HorizontalMenuWrapper>

      {activeSection === 'recipes' && <RecipeManagementList />}
      {activeSection === 'filters' && <FilterManagement />}

    </PageContainer>
  );
}

export default AdminPage;

