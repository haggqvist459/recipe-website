import { HorizontalMenuWrapper, PageContainer, ResponsiveWrapper } from "@/components/layout"
import { HorizontalMenuButton } from "@/components/ui"
import Planner from "@/features/mealPlanner/components/Planner"
import RecipeResults from "@/features/mealPlanner/components/RecipeResults"
import { useState } from "react"

const MealPlannerPage = () => {
  const [activeSection, setActiveSection] = useState<'planner' | 'recipes'>('planner')
  return (
    <PageContainer>
      <HorizontalMenuWrapper lgHidden={true}>
      <HorizontalMenuButton isActive={activeSection === 'planner'} onClick={() => setActiveSection('planner')}>
        Planner
      </HorizontalMenuButton>
      <HorizontalMenuButton isActive={activeSection === 'recipes'} onClick={() => setActiveSection('recipes')}>
        Recipes
      </HorizontalMenuButton>
      </HorizontalMenuWrapper>
      <div className="flex min-h-0 flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 lg:min-h-dvh lg:bg-linear-to-b from-90% from-marblewhite to-ceramic ">
          <ResponsiveWrapper isActive={activeSection === 'planner'}>
            <Planner />
          </ResponsiveWrapper>
        </div>
        <div className="w-full lg:w-2/3">
          <ResponsiveWrapper isActive={activeSection === 'recipes'}>
            <RecipeResults />
          </ResponsiveWrapper>
        </div>
      </div>
    </PageContainer>
  )
}

export default MealPlannerPage