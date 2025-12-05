import { NavLink } from "react-router-dom";
import { NAVBAR_OPTIONS } from "@/utils";
import { useLanguage, useAuth } from "@/contexts";
import { translateText } from "@/utils/";


type Props = {
  isExpanded: boolean
  onClick: () => void
}

const NavMenu = ({ isExpanded, onClick }: Props) => {

  const { language } = useLanguage()
  const { userRole } = useAuth();
  const linkClass = ({ isActive }: { isActive: boolean }) => isActive
    ? 'underline decoration-2' //active link classes 
    : '' //inactive link classes 

  let menuOptions;

  switch (userRole?.role) {
    case 'webmaster':
      menuOptions = [NAVBAR_OPTIONS.RECIPES, NAVBAR_OPTIONS.GROCERY_LIST, NAVBAR_OPTIONS.PROFILE, NAVBAR_OPTIONS.CREATE_RECIPE, NAVBAR_OPTIONS.ADMIN]
      break;
    case 'admin':
      menuOptions = [NAVBAR_OPTIONS.RECIPES, NAVBAR_OPTIONS.GROCERY_LIST, NAVBAR_OPTIONS.PROFILE, NAVBAR_OPTIONS.CREATE_RECIPE]
      break;
    case 'user':
      menuOptions = [NAVBAR_OPTIONS.RECIPES, NAVBAR_OPTIONS.GROCERY_LIST, NAVBAR_OPTIONS.PROFILE]
      break;
    default:
      menuOptions = [NAVBAR_OPTIONS.RECIPES, NAVBAR_OPTIONS.GROCERY_LIST, NAVBAR_OPTIONS.SIGN_IN]
      break;
  }

  const menuItems = menuOptions.map(({ route, id, labelKey, end }) => (
    <NavLink to={route} key={id} className={linkClass} onClick={onClick} end={end}>
      <span className="font-semibold hover:font-bold">{translateText('navMenu', labelKey, language)}</span>
    </NavLink>
  ))


  return (
    <div className="overflow-hidden transition-all duration-500 ease-in-out" style={{ height: isExpanded ? '36px' : '0px' }}>
      <div className="relative w-full mx-auto">
        <div className={`flex px-5 items-center justify-start md:justify-end overflow-x-auto whitespace-nowrap space-x-4 duration-500 ease-in-out ${isExpanded ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {menuItems}
        </div>
        <div className="md:hidden pointer-events-none absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-primary/90 to-transparent" />
        <div className="md:hidden pointer-events-none absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-primary/90 to-transparent" />
      </div>
    </div>
  );
}

export default NavMenu;
