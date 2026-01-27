import { useState } from "react";
import { PageContainer, Heading, LoadingComponent, SignOut, HorizontalMenuWrapper, ResponsiveWrapper, HorizontalMenuButton } from "@/components";
import { FavouriteListItem } from "@/features/favourites";
import { SettingsSection } from "@/features/settings";
import { useLanguage, useAuth } from "@/contexts";
import { translateText } from "@/utils";
import { useFavourites } from "@/features/favourites";


const ProfilePageTest = () => {

  const [activeSection, setActiveSection] = useState<"favourites" | "settings">("favourites");
  const favourites = useFavourites();
  const { language } = useLanguage();
  const { handleSignOut } = useAuth();

  return (
    <PageContainer>
      <HorizontalMenuWrapper lgHidden={true}>
        <HorizontalMenuButton isActive={activeSection === 'favourites'} onClick={() => setActiveSection('favourites')}>
          {translateText('profile', 'favouriteRecipes', language)}
        </HorizontalMenuButton>
        <HorizontalMenuButton isActive={activeSection === 'settings'} onClick={() => setActiveSection('settings')}>
          {translateText('profile', 'settings', language)}
        </HorizontalMenuButton>
      </HorizontalMenuWrapper>
      <div className="my-5 px-5 flex justify-between items-center">
        <Heading title={translateText("profile", 'title', language)} />
        <div onClick={async () => {
          await handleSignOut()
        }}>
          <SignOut />
        </div>
      </div>

      <div className="lg:flex lg:space-x-5 justify-start px-5 relative">
        <ResponsiveWrapper isActive={activeSection === "favourites"}>
          <Heading title={translateText('profile', 'favouriteRecipes', language)} headingType="sub-heading" />
          {favourites.length === 0 ? (
            <LoadingComponent />
          ) : (
            favourites.map(favourite => <FavouriteListItem favourite={favourite} key={favourite.recipeId} />)
          )}
        </ResponsiveWrapper>
        <ResponsiveWrapper isActive={activeSection === "settings"}>
          <SettingsSection />
        </ResponsiveWrapper>
      </div>
    </PageContainer>
  );
};

export default ProfilePageTest