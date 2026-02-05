import { useState } from "react";
import { PageContainer, HorizontalMenuWrapper, HorizontalMenuButton } from "@/components";
import { RecipeManagementList } from "@/features/recipes/recipeManagement";
import { FilterManagement } from "@/features/filters";

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

      {activeSection === 'recipes' && <RecipeManagementList />}
      {activeSection === 'filters' && <FilterManagement />}

    </PageContainer>
  );
}

export default AdminPage;

