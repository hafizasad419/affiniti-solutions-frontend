import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import Fallback from "@/components/Fallback";

const Home = lazy(() => import('@/pages/PreLogin/Home'));
const TrustManifesto = lazy(() => import('@/pages/PreLogin/TrustManifesto'));

function PublicRoutes() {

    return (
        <Suspense fallback={<Fallback />}>
            <Routes>
                <Route path='*' element={<Navigate to="/" />} />
                <Route path='/' element={<Home />} />
                <Route path='/trust-manifesto' element={<TrustManifesto />} />
            </Routes>
        </Suspense>
    )
}

export default PublicRoutes