import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { fetchSingleRecipe } from "@/integrations/supabase/services"
import { ErrorComponent, LoadingComponent } from "@/components/ui"
import { PageContainer } from "@/components/layout"
import { RecipeType } from "@/shared/types"
import { RecipeDetails } from "@/features/recipes/recipeList"
import { handleError } from "@/errorHandling"

const DetailsPage = () => {

  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recipe, setRecipe] = useState<RecipeType | null>(null)

  useEffect(() => {
    const recipeFromState = location.state?.recipe as RecipeType | undefined

    if (recipeFromState) {
      setRecipe(recipeFromState)
    } else {
      if (id) {
        const fetchRecipe = async () => {
          try {
            setLoading(true)
            const fetched = await fetchSingleRecipe(id)
            setRecipe(fetched)
          } catch (error) {
            setError(handleError(error))
          } finally {
            setLoading(false)
          }
        }
        fetchRecipe()
      } else {
        setError('No valid ID for a recipe found.')
      }

    }

    return () => {
      setRecipe(null)
    }
  }, [id])

  if (loading || !recipe) return <LoadingComponent />
  if (error) return <ErrorComponent errorMessage={error} />

  return (
    <PageContainer>
      <RecipeDetails recipe={recipe} />
    </PageContainer>
  )
}

export default DetailsPage