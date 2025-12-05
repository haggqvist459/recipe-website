import { useEffect, useState } from "react";
import { PageContainer } from "@/components";
import { EditRecipeMobile, EditRecipeDesktop } from "@/features/recipeForms/components";


const EditRecipePage = () => {

  const [isLargeScreen, setIsLargeScreen] = useState(() =>
    window.matchMedia('(min-width: 1024px)').matches
  );

  useEffect(() => {
    const handler = () =>
      setIsLargeScreen(window.matchMedia('(min-width: 1024px)').matches);

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
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