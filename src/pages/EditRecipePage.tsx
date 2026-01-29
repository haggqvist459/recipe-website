import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch } from "@/redux";
import { PageContainer } from "@/components";
import { EditRecipeMobile, EditRecipeDesktop } from "@/features/recipeForms/components";
import { setRecipeDraft } from "@/features/recipeForms";

const EditRecipePage = () => {

  const location = useLocation()
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>();

  const [isLargeScreen, setIsLargeScreen] = useState(() =>
    window.matchMedia('(min-width: 1024px)').matches
  );

  useEffect(() => {
    const handler = () =>
      setIsLargeScreen(window.matchMedia('(min-width: 1024px)').matches);

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    if (location.state) {
      dispatch(setRecipeDraft(location.state));
    }
  }, []);

  if (!id) {
    return (
      <PageContainer>
        <div className="">Recipe not Found</div>
      </PageContainer>
    )
  } // TODO PROPER ERROR COMPONENT

  return (
    <PageContainer>
      {isLargeScreen ?
        <EditRecipeDesktop recipeId={id} />
        : <EditRecipeMobile recipeId={id} />
      }
    </PageContainer>
  );
}

export default EditRecipePage;