import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './redux/store.js';
import App from './App.jsx';
import './index.css';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';

import HomeScreen from './pages/HomeScreen.jsx';
import ProductScreen from './pages/ProductScreen.jsx';
import CartScreen from './pages/CartScreen.jsx';
import LoginScreen from './pages/LoginScreen.jsx';
import RegisterScreen from './pages/RegisterScreen.jsx';
import ShippingScreen from './pages/ShippingScreen.jsx';
import PaymentScreen from './pages/PaymentScreen.jsx';
import PlaceOrderScreen from './pages/PlaceOrderScreen.jsx';
import OrderScreen from './pages/OrderScreen.jsx';
import ProfileScreen from './pages/ProfileScreen.jsx';
import ShopScreen from './pages/ShopScreen.jsx';

import OrderListScreen from './pages/admin/OrderListScreen.jsx';
import ProductListScreen from './pages/admin/ProductListScreen.jsx';
import ProductEditScreen from './pages/admin/ProductEditScreen.jsx';
import ProductCreateScreen from './pages/admin/ProductCreateScreen.jsx';
import UserListScreen from './pages/admin/UserListScreen.jsx';
import UserEditScreen from './pages/admin/UserEditScreen.jsx';
import DashboardScreen from './pages/admin/DashboardScreen.jsx';
import ErrorScreen from './pages/ErrorScreen.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<ErrorScreen />}>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* Private Routes */}
            <Route path="" element={<PrivateRoute />}>
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
            </Route>

            {/* Admin Routes */}
            <Route path="" element={<AdminRoute />}>
                <Route path="/admin/orderlist" element={<OrderListScreen />} />
                <Route path="/admin/productlist" element={<ProductListScreen />} />
                <Route path="/admin/product/create" element={<ProductCreateScreen />} />
                <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                <Route path="/admin/userlist" element={<UserListScreen />} />
                <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
                <Route path="/admin/dashboard" element={<DashboardScreen />} />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </HelmetProvider>
    </React.StrictMode>
);
