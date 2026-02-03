import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux';
import { fetchAllRecipes } from '@/supabase/services';
import { LoadingComponent, ErrorComponent } from "@/components";
import { useLanguage, } from '@/contexts';
import RecipeManagementCard from './RecipeManagementCard';
import { setRecipes } from '../slice';

const RecipeManagementList = () => {

  const { language } = useLanguage()
  const dispatch = useAppDispatch()

  const recipeList = useAppSelector(state => state.recipeList.recipes)
  const needsRefresh = useAppSelector(state => state.recipeList.needsRefresh)

  // const [recipeList, setRecipeList] = useState<RecipeType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')



  useEffect(() => {
    if (!needsRefresh && recipeList.length > 0) return;

    setLoading(true);
    setError(false)

    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchAllRecipes(language)
        dispatch(setRecipes(fetchedRecipes))

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
  }, [needsRefresh, language]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent errorMessage={errorMessage} />;
  }

  return (
    <div className='px-5 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-5 mb-10'>
      {recipeList.map(recipe => (
        <RecipeManagementCard key={recipe.id} recipe={recipe}/>
      ))}
    </div>
  );
}

export default RecipeManagementList;