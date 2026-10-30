import { useState } from "react"
import { PageContainer, HorizontalMenuWrapper, ResponsiveWrapper } from "@/components/layout"
import { Heading, LoadingComponent, HorizontalMenuButton } from "@/components/ui"
import { FavouriteListItem } from "@/features/favourites"
import { SettingsSection } from "@/features/settings"
import { useLanguage, useAuth } from "@/contexts"
import { translateText } from "@/shared"
import { useFavourites } from "@/features/favourites"


const ProfilePage = () => {

  const [activeSection, setActiveSection] = useState<"favourites" | "settings">("favourites")
  const favourites = useFavourites()
  const { language } = useLanguage()
  const { handleSignOut } = useAuth()

  return (
    <PageContainer>
      <div className="grid">
        <div className="col-start-1 row-start-1 pointer-events-none">
          <div className="pointer-events-auto">
            <HorizontalMenuWrapper justify="justify-end" >
              <button className="text-sm font-light text-ceramic hover:underline" onClick={async () => await handleSignOut()}>
                Sign Out
              </button>
            </HorizontalMenuWrapper>
          </div>
        </div>
        <div className="col-start-1 row-start-1">
          <HorizontalMenuWrapper lgHidden={true} bg="bg-transparent lg:bg-primary">
            <HorizontalMenuButton isActive={activeSection === 'settings'} onClick={() => setActiveSection('settings')}>
              {translateText('profile', 'settings', language)}
            </HorizontalMenuButton>
            <HorizontalMenuButton isActive={activeSection === 'favourites'} onClick={() => setActiveSection('favourites')}>
              {translateText('profile', 'favouriteRecipes', language)}
            </HorizontalMenuButton>
          </HorizontalMenuWrapper>
        </div>
      </div>

      <div className="lg:flex justify-start">
        <div className="w-full lg:w-1/3 lg:min-h-screen lg:bg-marblewhite">
          <ResponsiveWrapper isActive={activeSection === "settings"}>
            <SettingsSection />
          </ResponsiveWrapper>
        </div>
        <div className="w-full lg:w-2/3">
          <ResponsiveWrapper isActive={activeSection === "favourites"}>
            {favourites.length === 0 ? (
              <LoadingComponent />
            ) : (
              <div className="px-5 mt-5">
                <Heading title={`${translateText('profile', 'favouriteRecipes', language)} (${favourites.length})`} headingType="sub-heading" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2">
                  {favourites.map(favourite => <FavouriteListItem favourite={favourite} key={favourite.recipeId} />)}
                </div>
              </div>
            )}
          </ResponsiveWrapper>
        </div>
      </div>
    </PageContainer>
  )
}

export default ProfilePage

