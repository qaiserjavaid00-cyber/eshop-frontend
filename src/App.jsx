

import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Profile } from './pages/Profile'


import { AdminDashboard } from './pages/AdminDashboard'
import { AdminProducts } from './pages/AdminProducts'
import { AdminProduct } from './pages/AdminProduct'
import Dashboard from './components/Dashboard'
import { CreateCategory } from './pages/CreateCategory'
import { SubCategory } from './pages/SubCategory'
// import { FormExample } from './pages/FormExample'

import { ProductUpdate } from './pages/ProductUpdate'
import { Home } from './pages/Home'
import { ProductDetails } from './pages/ProductDetails'
import { Shop } from './pages/Shop'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartScreen } from './pages/CartScreen'
import { Checkout } from './pages/Checkout'
import { Coupons } from './pages/Coupons'
// import { Payment } from './pages/Payment'
import { SuccessPage } from './pages/SuccessPage'
import { OrderHistory } from './pages/OrderHistory'
// import { Orders } from './pages/Orders'
import { Wishlist } from './pages/Wishlist'
import PlaceOrder from './pages/PlaceOrder'
// import History from './components/user/History'
import UserDashboard from './components/user/UserDashboard'
import UserStats from './components/user/UserStats'
import Navbar from './components/layout/Navbar'
import AuthRoute from './components/routes/AuthRoute'
import ProtectedRoute from './components/routes/ProtectedRoute'
import AdminHero from './components/admin/hero'
import AdminOrdersTable from './components/admin/AdminOrdersTable'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="admin" element={
          <AuthRoute>
            <AdminDashboard />
          </AuthRoute>
        }>
          <Route path="products" element={<AdminProducts />} />
          <Route path="product" element={<AdminProduct />} />
          <Route path="dash" element={<Dashboard />} />
          <Route path="cat" element={<CreateCategory />} />
          <Route path="cpn" element={<Coupons />} />
          <Route path="sub-cat" element={<SubCategory />} />
          <Route path="orders" element={<AdminOrdersTable />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="products/edit/:id" element={<ProductUpdate />} />
        </Route>

        <Route path="user" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }>
          <Route path="history" element={<OrderHistory />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="dashboard" element={<UserStats />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:slug" element={<ProductDetails />} />
        <Route path="/shop" element={<Shop />} />


        <Route path="/cart" element={
          // <ProtectedRoute>
          <CartScreen />
          // </ProtectedRoute>
        } />

        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute>
            <PlaceOrder />
          </ProtectedRoute>
        } />
        <Route path="/order/success/:orderId" element={
          <ProtectedRoute>
            <SuccessPage />
          </ProtectedRoute>
        } />

      </Routes>

      <ToastContainer position="top-right" />
    </>
  )
}

export default App
