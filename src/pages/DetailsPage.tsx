import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useLanguage } from "@/contexts"
import { fetchSingleRecipe } from "@/supabase/services"
import { PageContainer, ErrorComponent, LoadingComponent } from "@/components"
import { RecipeType } from "@/types"
import { RecipeDetails } from "@/features/recipes/recipeList"
import { handleError } from "@/errorHandling"

const DetailsPage = () => {

  const { language } = useLanguage()
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
      const fetchRecipe = async () => {
        try {
          setLoading(true)
          const fetched = await fetchSingleRecipe(id!, language)
          setRecipe(fetched)
        } catch (error) {
          setError(handleError(error))
        } finally {
          setLoading(false)
        }
      }

      fetchRecipe()
    }

    return () => {
      setRecipe(null)
    }
  }, [id])

  if (loading || !recipe) return <LoadingComponent />
  if (error) return <ErrorComponent errorMessage={error} />

  return (
    <PageContainer>
      <RecipeDetails recipe={recipe}/>
    </PageContainer>
  )
}

export default DetailsPage