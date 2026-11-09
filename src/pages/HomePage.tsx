import { PageContainer } from "@/components/layout"
import { RecipeList } from "@/features/recipes/recipeList"
import { Filters } from '@/features/filters'


const HomePage = () => {

  return (
    <PageContainer>
      <div className="sticky top-0">
        <Filters />
      </div>
      <div className="p-5 flex-1 overflow-y-auto">
        <RecipeList />
      </div>
    </PageContainer>
  )

}

export default HomePage