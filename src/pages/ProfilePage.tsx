
import { useState } from "react";
import { PageContainer, Heading, LoadingComponent, SignOut, HorizontalMenuWrapper } from "@/components";
import { FavouriteListItem } from "@/features/favourites";
import { SettingsSection } from "@/features/settings";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";
import { useFavourites } from "@/features/favourites";
import { signOut } from "@/utils/backend/api";

const ProfilePageTest = () => {

  const [activeSection, setActiveSection] = useState<"favourites" | "settings">("favourites");
  const favourites = useFavourites();
  const { language } = useLanguage();

  return (
    <PageContainer>
      <HorizontalMenuWrapper lgHidden={true}>
          <button
            onClick={() => setActiveSection("favourites")}
            className={`text-primary-text ${activeSection === "favourites" ? "underline decoration-2" : "font-light"}`}
          >
            {translateText('profile', 'favouriteRecipes', language)}
          </button>
          <button
            onClick={() => setActiveSection("settings")}
            className={`text-primary-text ${activeSection === "settings" ? "underline decoration-2" : "font-light"}`}
          >
            {translateText('profile', 'settings', language)}
          </button>
      </HorizontalMenuWrapper>
      <div className="my-5 px-5 flex justify-between items-center">
        <Heading title={translateText("profile", 'title', language)} />
        <div onClick={async () => {
          await signOut()
        }}>
          <SignOut />
        </div>
      </div>

      <div className="lg:flex lg:space-x-5 justify-start px-5">
        <div
          className={`
            lg:w-1/3 
            ${activeSection === "favourites" ? "block" : "hidden"} 
            lg:block
          `}
        >
          <Heading title={translateText('profile', 'favouriteRecipes', language)} headingType="sub-heading" />
          {favourites.length === 0 ? (
            <LoadingComponent height="" />
          ) : (
            favourites.map(favourite => <FavouriteListItem favourite={favourite} key={favourite.recipeId} />)
          )}
        </div>

        <div
          className={`
            lg:w-1/3 
            ${activeSection === "settings" ? "block" : "hidden"} 
            lg:block
          `}
        >
          <SettingsSection />
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfilePageTest