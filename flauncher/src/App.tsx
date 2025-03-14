import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./providers/AuthProvider.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import Layout from "./layouts/Layout.tsx";
import { Login } from "./pages/AuthPages/Login.tsx";
import { Register } from "./pages/AuthPages/Register.tsx";
import { Profile } from "./pages/Profile/Profile.tsx";
import { Home } from "./pages/Home/Home.tsx";
import { pageConfig } from "./configs/page.config.ts";

function App() {
    useEffect(() => {
        const handleDragStart = (event: DragEvent) => {
            event.preventDefault();
        };

        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
        };

        document.addEventListener('dragstart', handleDragStart);
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('dragstart', handleDragStart);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);


    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Navigate to={pageConfig.home} />}/>

                        <Route path={pageConfig.login} element={<Login />} />
                        <Route path={pageConfig.register} element={<Register />} />

                        {/*Защищённые роуты*/}
                        <Route
                            path={pageConfig.home}
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Home />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path={pageConfig.profile}
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Profile />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>

            <ToastContainer
                position='top-center'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </>
    );
}

export default App;
