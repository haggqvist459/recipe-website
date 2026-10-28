import { PageContainer } from "@/components/layout"
import { RecipeList } from "@/features/recipes/recipeList"
import { Filters} from '@/features/filters'


const HomePage = () => {

  return (
    <PageContainer>
      <Filters />
      <div className="my-5 px-5">
        {/* <Heading title={translateText('homePage', 'recipe', language)} /> */}
        <RecipeList />
      </div>
    </PageContainer>
  )

}

export default HomePage