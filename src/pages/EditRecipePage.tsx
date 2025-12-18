import { useLocation } from "react-router-dom";
import { useAppDispatch } from "@/redux";
import { useEffect, useState } from "react";
import { PageContainer } from "@/components";
import { EditRecipeMobile, EditRecipeDesktop } from "@/features/recipeForms/components";
import { setRecipeDraft } from "@/features/recipeForms";

const EditRecipePage = () => {

  const location = useLocation()
  const dispatch = useAppDispatch()

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
  
  return (
    <PageContainer>
      {isLargeScreen ?
        <EditRecipeDesktop />
        : <EditRecipeMobile />
      }
    </PageContainer>
  );
}

export default EditRecipePage;