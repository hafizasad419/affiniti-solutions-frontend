import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import Fallback from "@/components/Fallback";

const Home = lazy(() => import('@/pages/PreLogin/Home'));
const TrustManifesto = lazy(() => import('@/pages/PreLogin/TrustManifesto'));
const EarlyAccess = lazy(() => import('@/pages/PreLogin/EarlyAccess'));
const ThankYou = lazy(() => import('@/pages/PreLogin/ThankYou'));
const Welcome = lazy(() => import('@/pages/PreLogin/Welcome'));

function PublicRoutes() {

    return (
        <Suspense fallback={<Fallback />}>
            <Routes>
                <Route path='*' element={<Navigate to="/" />} />
                <Route path='/' element={<Home />} />
                <Route path='/trust-manifesto' element={<TrustManifesto />} />
                <Route path='/access' element={<EarlyAccess />} />
                <Route path='/thank-you' element={<ThankYou />} />
                <Route path='/welcome' element={<Welcome />} />
            </Routes>
        </Suspense>
    )
}

export default PublicRoutes