import { useState } from "react";
import { PageContainer, HorizontalMenuWrapper, HorizontalMenuButton, ResponsiveWrapper } from "@/components";
import { RecipeManagementList } from "@/features/recipes/recipeManagement";


const AdminPage = () => {

  const [activeSection, setActiveSection] = useState<"recipes" | "filters">("recipes")

  return (
    <PageContainer>
      <HorizontalMenuWrapper>
        <HorizontalMenuButton isActive={activeSection === 'recipes'} onClick={() => setActiveSection('recipes')}>
          Recipes
        </HorizontalMenuButton>
        <HorizontalMenuButton isActive={activeSection === 'filters'} onClick={() => setActiveSection('filters')}>
          Filters
        </HorizontalMenuButton>
      </HorizontalMenuWrapper>
      <ResponsiveWrapper isActive={activeSection === 'recipes'}>
        <RecipeManagementList />
      </ResponsiveWrapper>
      <ResponsiveWrapper isActive={activeSection === 'filters'}>
        <>
        </>
      </ResponsiveWrapper>

    </PageContainer>
  );
}

export default AdminPage;

