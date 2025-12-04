import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/utils';
import { MainLayout, AuthLayout } from '@/layouts';
import { HomePage, AdminPage, ErrorPage, DetailsPage, ProfilePage, AuthPage, GroceryPage, CreateRecipePage } from '@/pages';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.DETAILS} element={<DetailsPage />} />
          <Route path={ROUTES.ERROR} element={<ErrorPage />} />
          <Route path={ROUTES.SIGN_IN} element={<AuthPage />}/>
          <Route path={ROUTES.GROCERY_LIST} element={<GroceryPage />} />
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.ADMIN} element={<AdminPage />} />
            <Route path={ROUTES.CREATE_RECIPE} element={<CreateRecipePage />}/>
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
