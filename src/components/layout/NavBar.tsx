import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/utils'
import { NavMenu, NavButton } from '@/components';

const NavBar = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header className='bg-primary' id='navBar'>
      <div className='flex items-center justify-between px-5'>
        <NavLink className='py-3' to={ROUTES.HOME}>
          <div className='flex flex-col text-primary-text'>
            <span className='text-xl lg:text-2xl font-bold'>Recipes</span>
          </div>
        </NavLink>
        <NavButton isExpanded={isExpanded} onClick={() => setIsExpanded(prev => !prev)} />
      </div>
      <NavMenu isExpanded={isExpanded} onClick={() => setIsExpanded(prev => !prev)} />
    </header>
  )
}

export default NavBar;