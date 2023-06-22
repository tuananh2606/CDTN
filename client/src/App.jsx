import ThemeProvider from './theme';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import MainLayout from './layouts/MainLayout';
import { publicRoutes, privateRoutes, protectedRoutes } from './routes';
import DashboardLayout from './layouts/Admin/dashboard/DashboardLayout';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
    return (
        <HelmetProvider>
            <Router>
                <ThemeProvider>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, idx) => {
                                const Page = route.component;
                                const isAuth = route.isAuth;
                                let Layout = MainLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }

                                return (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                            <Route element={<ProtectedRoutes />}>
                                {protectedRoutes.map((route, idx) => {
                                    const Page = route.component;
                                    let Layout = MainLayout;
                                    if (route.layout) {
                                        Layout = route.layout;
                                    } else if (route.layout === null) {
                                        Layout = Fragment;
                                    }

                                    return (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })}
                            </Route>
                            <Route element={<PrivateRoutes />}>
                                {privateRoutes.map((route, idx) => {
                                    const Page = route.component;
                                    let Layout = DashboardLayout;
                                    if (route.layout) {
                                        Layout = route.layout;
                                    } else if (route.layout === null) {
                                        Layout = Fragment;
                                    }
                                    return (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })}
                            </Route>
                        </Routes>
                    </div>
                </ThemeProvider>
            </Router>
        </HelmetProvider>
    );
}

export default App;
