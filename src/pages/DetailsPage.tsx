import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useAppDispatch } from "@/redux"
import { useLanguage } from "@/contexts"
import { fetchSingleRecipe } from "@/supabase/services"
import { PageContainer, ErrorComponent, LoadingComponent } from "@/components"
import { RecipeType } from "@/types"
import { RecipeDetails } from "@/features/recipes/recipeList"
import { setActiveRecipe, clearActiveRecipe } from '@/features/recipes/slice'

const DetailsPage = () => {

  const { language } = useLanguage()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const recipeFromState = location.state?.recipe as RecipeType | undefined

    if (recipeFromState) {
      dispatch(setActiveRecipe(recipeFromState))
    } else {
      const fetchRecipe = async () => {
        try {
          setLoading(true)
          setError(false)
          const fetched = await fetchSingleRecipe(id!, language)
          dispatch(setActiveRecipe(fetched))
        } catch (error) {
          if (typeof error === 'string') {
            setErrorMessage(error)
          } else {
            setErrorMessage('An unknown error has occurred.')
          }
          setError(true)
        } finally {
          setLoading(false)
        }
      }

      fetchRecipe()
    }

    return () => {
      dispatch(clearActiveRecipe())
    }
  }, [id])

  if (loading) return <LoadingComponent />
  if (error) return <ErrorComponent errorMessage={errorMessage} />

  return (
    <PageContainer>
      <RecipeDetails />
    </PageContainer>
  )
}

export default DetailsPage