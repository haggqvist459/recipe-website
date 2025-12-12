import { useState } from "react";
import { PageContainer, HorizontalMenuWrapper } from "@/components";
import { RecipeManagementList } from "@/features/recipes/recipeManagement";


const AdminPage = () => {

  const [activeSection, setActiveSection] = useState<"recipes" | "filters">("recipes")

  return (
    <PageContainer>
      <HorizontalMenuWrapper lgHidden={true}>
        <button
          type="button"
          className={`${activeSection === 'recipes' ? 'underline decoration-2' : 'font-light'}`}
          onClick={() => setActiveSection('recipes')}
        >
          Recipes
        </button>
        <button
          type="button"
          className={`${activeSection === 'filters' ? 'underline decoration-2' : 'font-light'}`}
          onClick={() => setActiveSection('filters')}
        >
          Filters
        </button>
      </HorizontalMenuWrapper>
      
      <RecipeManagementList />
    </PageContainer>
  );
}

export default AdminPage;

