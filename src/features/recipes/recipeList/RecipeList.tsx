import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchAllRecipes } from '@/supabase/services'
import { useLanguage } from '@/contexts'
import { selectFilteredRecipes } from '../selectors'
import { setRecipes } from '../slice'
import RecipeCard from './RecipeCard'
import { LoadingComponent, ErrorComponent } from "@/components"
import { handleError } from '@/errorHandling'



const RecipeList = () => {

  const { language } = useLanguage()
  const dispatch = useAppDispatch()
  const filteredRecipes = useAppSelector(selectFilteredRecipes)
  const needsRefresh = useAppSelector(state => state.recipeList.needsRefresh)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!needsRefresh) return

    setLoading(true)
    setError(null)

    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchAllRecipes(language)

        dispatch(setRecipes(fetchedRecipes))

      } catch (error) {
        setError(handleError(error))
      } finally {
        setLoading(false)
      }
    };

    loadRecipes()
  }, [needsRefresh])


  if (loading) return <LoadingComponent />
  if (error) return <ErrorComponent errorMessage={error} />
  

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-10'>
      {filteredRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div >
  )
}

export default RecipeList;


