import { PageContainer } from "@/components/layout"
import { RecipeList } from "@/features/recipes/recipeList"
import { Filters } from '@/features/filters'


const HomePage = () => {

  return (
    <PageContainer>
      <Filters />
      <div className="my-5 px-5 flex-1 min-h-0 overflow-y-auto">
        <RecipeList />
      </div>
    </PageContainer>
  )

}

export default HomePage