import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import LayoutAuth from './pages/auth/Layout.tsx'
import PageSignin from './pages/auth/signin/Index.tsx'
import PageSignup from './pages/auth/signup/Index.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import LayoutDashboard from './pages/dashboard/Layout.tsx'
import "aos/dist/aos.css";
import PageDashboard from './pages/dashboard/Index.tsx'
import PageDashboardProfile from './pages/dashboard/profile/index.tsx'
import PageDashboardCar from './pages/dashboard/car/index.tsx'
import { LayoutDashboardCar } from './pages/dashboard/car/Layout.tsx'
import PageDashboardCarBrand from './pages/dashboard/car/brand/index.tsx'
import { LayoutDashboardSetting } from './pages/dashboard/setting/Layout.tsx'
import { PageDashboardCarImage } from './pages/dashboard/car/image/index.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<LayoutAuth />}>
            <Route path='signin' element={<PageSignin />} />
            <Route path='signup' element={<PageSignup />} />
          </Route>
          
          <Route path='/dashboard' element={<LayoutDashboard />}>
            <Route index={true} element={<PageDashboard />} />
            <Route path='profile' element={<PageDashboardProfile />} />

            <Route path='car' element={<LayoutDashboardCar />}>
               <Route index element={<PageDashboardCar />} />
               <Route path='brand' element={<PageDashboardCarBrand />} />
               <Route path='image' element={<PageDashboardCarImage />} />
            </Route>

            <Route path='setting' element={<LayoutDashboardSetting />}>
              <Route index element={<PageDashboardProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
