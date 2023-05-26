import ThemeProvider from './theme';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import MainLayout from './layouts/MainLayout';
import { publicRoutes, privateRoutes } from './routes';
import DashboardLayout from './layouts/Admin/dashboard/DashboardLayout';

function App() {
    return (
        <HelmetProvider>
            <Router>
                <ThemeProvider>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, idx) => {
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
                        </Routes>
                    </div>
                </ThemeProvider>
            </Router>
        </HelmetProvider>
    );
}

export default App;
