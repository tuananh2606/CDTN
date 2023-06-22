import {
    HomePage,
    ProductGrid,
    ProductDetails,
    RegistrationPage,
    CartPage,
    CheckoutPage,
    LoginPage,
} from '../pages/Client';

import { UserPageClient } from '../pages/User';
import { UserPage, DashboardAppPage, CategoriesPage, ProductsPage } from '../pages/Admin';
import UpdateCategoryPage from '../pages/Admin/Category/UpdateCategoryPage';
import UpdateProductPage from '../pages/Admin/Product/UpdateProductPage';
// import ProductsPage from '../pages/Admin/ProductsPage';

//Layouts
import { UserPageLayout, LoginLayout } from '../layouts';
import ProtectedRoutes from './ProtectedRoutes';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/:category', component: ProductGrid },
    { path: '/:category/:slug/:code', component: ProductDetails },
    { path: '/registration', component: RegistrationPage },
    { path: '/login', component: LoginPage, layout: LoginLayout },
    { path: '/cart', component: CartPage },
    // { path: '/checkout', component: CheckoutPage },
];

const protectedRoutes = [
    { path: '/user', component: UserPageClient, layout: UserPageLayout },
    { path: '/checkout', component: CheckoutPage },
];

const privateRoutes = [
    { path: '/admin/dashboard', component: DashboardAppPage },
    { path: '/admin/users', component: UserPage },
    { path: '/admin/products', component: ProductsPage },
    { path: '/admin/categories', component: CategoriesPage },
    { path: '/admin/categories/edit', component: UpdateCategoryPage },
    { path: '/admin/products/edit', component: UpdateProductPage },

    // { path: '/admin/product', component: ProductsPage },
];

export { publicRoutes, privateRoutes, protectedRoutes };
