import { Suspense } from 'react'
import Fallback from '@/components/Fallback'
import { useAuth } from '@/redux/hooks/use-auth'
import ProtectedRoutes from './ProtectedRoutes'
import PublicRoutes from './PublicRoutes'
import PreLoginHeader from '@/components/Header/PreLoginHeader'
import Footer from '@/components/Footer'

const BaseRoutes = () => {
  const { isAuthenticated } = useAuth()
  return (

    <>
      <div
        className="">
        <Suspense fallback={<Fallback />}>
          {
            isAuthenticated ?
              <>
                <ProtectedRoutes />
              </>

              :

              <>
                <PreLoginHeader />
                <PublicRoutes />
                <Footer />
              </>

          }
        </Suspense>
      </div>

    </>
  )
}
export default BaseRoutes