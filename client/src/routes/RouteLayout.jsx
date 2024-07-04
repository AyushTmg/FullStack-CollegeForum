import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import NotFound from "../pages/NotFound/notFound";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/Common/ProtectedRoute/ProtectedRoute";
import PublicRoute from "../components/Common/PublicRoute/PublicRoute";


function RegisterAndLogout() {
    localStorage.clear()
    return <Register />;
}


// ! Projects Route Layout 
export default function RouteLayout() {
    return (
        <div>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>}>
                </Route>

                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>}
                />

                <Route path="/register" element={
                    <PublicRoute>
                        <RegisterAndLogout />
                    </PublicRoute>
                } />

                {/* ! If the Route Other than the specified one are mapped this NotFound Component Will be Called */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div >
    )
}