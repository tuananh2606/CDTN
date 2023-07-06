import {
    HomePage,
    ProductGrid,
    ProductDetails,
    RegistrationPage,
    CartPage,
    CheckoutPage,
    LoginPage,
    OrderStatus,
    ResetPasswordPage,
} from '../pages/Client';

import { UserPageClient } from '../pages/User';
import {
    UserPage,
    DashboardAppPage,
    CategoriesPage,
    ProductsPage,
    OrdersPage,
    CreateUserPage,
    UpdateUserPage,
    CreateCategoryPage,
} from '../pages/Admin';
import UpdateCategoryPage from '../pages/Admin/Category/UpdateCategoryPage';
import UpdateProductPage from '../pages/Admin/Product/UpdateProductPage';
// import ProductsPage from '../pages/Admin/ProductsPage';

//Layouts
import { UserPageLayout, SecondLayout } from '../layouts';
const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/:category', component: ProductGrid },
    { path: '/:category/:slug/:code', component: ProductDetails },
    { path: '/registration', component: RegistrationPage },
    { path: '/login', component: LoginPage, layout: SecondLayout },
    { path: '/cart', component: CartPage },
    // { path: '/checkout/success', component: OrderSuccess, layout: SecondLayout },
    { path: '/order-status', component: OrderStatus, layout: SecondLayout },
    { path: '/reset-your-password/:userId', component: ResetPasswordPage, layout: SecondLayout },
];

const protectedRoutes = [
    { path: '/user', component: UserPageClient, layout: UserPageLayout },
    { path: '/checkout', component: CheckoutPage },
];

const privateRoutes = [
    { path: '/admin', component: DashboardAppPage },
    { path: '/admin/dashboard', component: DashboardAppPage },
    { path: '/admin/users', component: UserPage },
    { path: '/admin/users/create', component: CreateUserPage },
    { path: '/admin/users/edit', component: UpdateUserPage },
    { path: '/admin/products', component: ProductsPage },
    { path: '/admin/categories', component: CategoriesPage },
    { path: '/admin/categories/create', component: CreateCategoryPage },
    { path: '/admin/orders', component: OrdersPage },
    // { path: '/admin/orders/create', component: CreateOrderPage },
    { path: '/admin/categories/edit', component: UpdateCategoryPage },
    { path: '/admin/products/edit', component: UpdateProductPage },

    // { path: '/admin/product', component: ProductsPage },
];

export { publicRoutes, privateRoutes, protectedRoutes };
