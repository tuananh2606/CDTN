import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/Client/HomePage'));
const ProductGrid = lazy(() => import('../pages/Client/Products/ProductGrid'));
const ProductDetails = lazy(() => import('../pages/Client/Products/ProductDetails'));
const RegistrationPage = lazy(() => import('../pages/Client/Identification/RegistrationPage'));
const CartPage = lazy(() => import('../pages/Client/CartPage/CartPage'));
const CheckoutPage = lazy(() => import('../pages/Client/CheckoutPage/CheckoutPage'));
const LoginPage = lazy(() => import('../pages/Client/Identification/LoginPage'));
const OrderStatus = lazy(() => import('../pages/Client/OrderStatus'));
const ResetPasswordPage = lazy(() => import('../pages/Client/Identification/ResetPasswordPage'));
const OverviewPage = lazy(() => import('../pages/User/OverviewPage'));
const ProfilePage = lazy(() => import('../pages/User/ProfilePage'));
const WishlistPage = lazy(() => import('../pages/User/WishlistPage'));
import {
  UserPage,
  DashboardAppPage,
  CategoriesPage,
  ProductsPage,
  OrdersPage,
  CreateUserPage,
  UpdateUserPage,
  CreateCategoryPage,
  UpdateOrderPage,
  CreateProductPage,
  UpdateProductPage,
  UpdateCategoryPage,
} from '../pages/Admin';

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
  { path: '/user/overview', component: OverviewPage, layout: UserPageLayout },
  { path: '/user/profile', component: ProfilePage, layout: UserPageLayout },
  { path: '/user/wishlist', component: WishlistPage, layout: UserPageLayout },
  { path: '/checkout', component: CheckoutPage },
];

const privateRoutes = [
  { path: '/admin', component: DashboardAppPage },
  { path: '/admin/dashboard', component: DashboardAppPage },
  { path: '/admin/users', component: UserPage },
  { path: '/admin/users/create', component: CreateUserPage },
  { path: '/admin/users/edit', component: UpdateUserPage },
  { path: '/admin/products', component: ProductsPage },
  { path: '/admin/products/create', component: CreateProductPage },
  { path: '/admin/products/edit', component: UpdateProductPage },
  { path: '/admin/categories', component: CategoriesPage },
  { path: '/admin/categories/create', component: CreateCategoryPage },
  { path: '/admin/categories/edit', component: UpdateCategoryPage },
  { path: '/admin/orders', component: OrdersPage },
  { path: '/admin/orders/edit', component: UpdateOrderPage },
  // { path: '/admin/orders/create', component: CreateOrderPage },

  // { path: '/admin/product', component: ProductsPage },
];

export { publicRoutes, privateRoutes, protectedRoutes };
