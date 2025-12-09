import { PageContainer, Heading, } from "@/components";
import { RecipeList } from "@/features/recipes/recipeList";
import { Filters} from '@/features/filters';
import { useLanguage, } from '@/contexts';
import { translateText } from '@/utils';



const HomePage = () => {

  const { language } = useLanguage()
  

  return (
    <PageContainer>
      <Filters />
      <div className="my-3 px-3">
        <Heading title={translateText('homePage', 'recipe', language)} />
        <RecipeList />
      </div>
    </PageContainer>
  );

}

export default HomePage;