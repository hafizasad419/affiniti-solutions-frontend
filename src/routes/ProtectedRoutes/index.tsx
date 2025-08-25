import { Suspense } from 'react'
import Fallback from '@/components/Fallback'
import AdminRoutes from '@/routes/ProtectedRoutes/AdminRoutes'
import UserRoutes from '@/routes/ProtectedRoutes/UserRoutes'
import UserHeader from '@/components/Header/UserHeader'
import AdminHeader from '@/components/Header/AdminHeader'
import { useAuth } from '@/redux/hooks/use-auth'
import { USER_ROLES } from '@/constants'

const ProtectedRoutes = () => {
    const { isAuthenticated, role } = useAuth()
    const isAdmin = isAuthenticated && role === USER_ROLES.ADMIN
    const isUser = isAuthenticated && role === USER_ROLES.USER

    return (

        <>
            <div
                className="">
                <Suspense fallback={<Fallback />}>
                    {
                        isAdmin ?
                            <>
                                <AdminHeader />
                                <AdminRoutes />
                            </>

                            : isUser ?

                                <>
                                    <UserHeader />
                                    <UserRoutes />
                                </>

                                :

                                null
                    }
                </Suspense>
            </div>

        </>
    )
}
export default ProtectedRoutes