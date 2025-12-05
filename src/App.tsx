import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/utils';
import { MainLayout, AuthLayout } from '@/layouts';
import { HomePage, AdminPage, ErrorPage, DetailsPage, ProfilePage, AuthPage, GroceryPage, CreateRecipePage } from '@/pages';


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
         <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.RECIPES} replace />} />
          <Route path={ROUTES.RECIPES}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.DETAILS} element={<DetailsPage />} />
          </Route>
          <Route path={ROUTES.ERROR} element={<ErrorPage />} />
          <Route path={ROUTES.SIGN_IN} element={<AuthPage />} />
          <Route path={ROUTES.GROCERY_LIST} element={<GroceryPage />} />
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.ADMIN} element={<AdminPage />} />
            <Route path={ROUTES.CREATE_RECIPE} element={<CreateRecipePage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
