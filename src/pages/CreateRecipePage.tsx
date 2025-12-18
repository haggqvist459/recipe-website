import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux";
import { PageContainer } from "@/components";
import { CreateRecipeMobile, CreateRecipeDesktop } from "@/features/recipeForms/components";
import { resetState } from "@/features/recipeForms"; 

const CreateRecipePage = () => {

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
    dispatch(resetState());
  }, []);

  return (
    <PageContainer>
      {isLargeScreen ?
        <CreateRecipeDesktop />
        : <CreateRecipeMobile />
      }
    </PageContainer>
  );
}

export default CreateRecipePage;