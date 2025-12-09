import { useState, useEffect } from 'react'
import { fetchRecipesAPI } from '@/utils/backend/api/recipes';
import { RecipeType, } from '@/types';
import { LoadingComponent, ErrorComponent } from "@/components";
import { useLanguage, } from '@/contexts';
import RecipeManagementCard from './RecipeManagementCard';

const RecipeManagementList = () => {

  const { language } = useLanguage()

  const [recipeList, setRecipeList] = useState<RecipeType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    setLoading(true);
    setError(false)

    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipesAPI(language)
        setRecipeList(fetchedRecipes)

      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to load recipes:", error);
          setError(true)
          setErrorMessage(error.message)
        }
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent errorMessage={errorMessage} />;
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-10'>
      {recipeList.map(recipe => (
        <RecipeManagementCard key={recipe.id} recipe={recipe}/>
      ))}
    </div>
  );
}

export default RecipeManagementList;