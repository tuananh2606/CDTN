import HomePage from '../pages/HomePage';
import ProductGrid from '../pages/ProductGrid';
import ProductDetails from '../pages/ProductDetails';
import Registration from '../pages/RegistrationPage';
import DashboardAppPage from '../pages/Admin/DashboardAppPage';
import UserPage from '../pages/Admin/UserPage';
// import ProductsPage from '../pages/Admin/ProductsPage';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/:category', component: ProductGrid },
    { path: '/product', component: ProductDetails },
    { path: '/registration', component: Registration },
];

const privateRoutes = [
    { path: '/admin/dashboard', component: DashboardAppPage },
    { path: '/admin/user', component: UserPage },
    // { path: '/admin/product', component: ProductsPage },
];

export { publicRoutes, privateRoutes };
