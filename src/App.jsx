

import {
  Route, Routes,
  // useNavigate 
} from 'react-router-dom'
import './App.css'
import { Login } from './pages/User/Login'
import { Register } from './pages/User/Register'
import { Profile } from './pages/User/Profile'


import { AdminDashboard } from './pages/Admin/AdminDashboard'
import { AdminProducts } from './pages/Admin/AdminProducts'
import { AdminProduct } from './pages/Admin/AdminProduct'
import Dashboard from './components/Dashboard'
import { CreateCategory } from './pages/Admin/CreateCategory'
import { SubCategory } from './pages/Admin/SubCategory'

import { Home } from './pages/Home'
import { ProductDetails } from './pages/Products/ProductDetails'
import { Shop } from './pages/Products/Shop'
import { ToastContainer } from 'react-toastify';
import { CartScreen } from './pages/Cart/CartScreen'
import { Checkout } from './pages/Cart/Checkout'
import { Coupons } from './pages/Admin/Coupons'
import { SuccessPage } from './pages/Orders/SuccessPage'
import { OrderHistory } from './pages/Orders/OrderHistory'
import { Wishlist } from './pages/User/Wishlist'
import PlaceOrder from './pages/Orders/PlaceOrder'
import UserDashboard from './components/user/UserDashboard'
import Navbar from './components/layout/Navbar'
import AuthRoute from './components/routes/AuthRoute'
import ProtectedRoute from './components/routes/ProtectedRoute'
import AdminOrdersTable from './components/admin/AdminOrdersTable'
import HeroManagementPage from './pages/Admin/HeroManagementPage'
import Footer from './components/layout/Footer'

import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'leaflet/dist/leaflet.css';

import { AdminNotifications } from './pages/Admin/AdminNotifications'
import { NotificationBar } from './components/layout/NotificationBar'
import AdminAbout from './pages/Admin/AdminAbout'
import AboutPage from './pages/Admin/AboutPage'
import { useCheckAuth } from './hooks/users/useAuth'
import { TrackOrderPage } from './pages/Orders/TrackOrder'
import Stats from './components/user/Stats'
import { useDispatch } from 'react-redux'
import { resetUser } from './redux/userSlice'
import { useEffect } from 'react'
import FAQPage from './pages/faqs'
import ContactPage from './pages/ContactPage'
import { ProductUpdate } from './pages/Admin/ProductUpdate'
import Shipping from './pages/User/Shipping'
import ScrollToTop from './components/layout/ScrollToTop'

function App() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: authData, error } = useCheckAuth()

  console.log("Auth Error", error)
  console.log("Auth Data", authData)

  useEffect(() => {
    if (error) {
      dispatch(resetUser())
      // navigate("/login")
    }
  }, [error])

  return (

    <>
      <ScrollToTop />
      <NotificationBar />
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
          <Route path="hero" element={<HeroManagementPage />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="products/edit/:id" element={<ProductUpdate />} />
        </Route>

        <Route path="user" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<Stats />} />
          <Route path="history" element={<OrderHistory />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:slug" element={<ProductDetails />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />

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
        <Route path="/shipping" element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        } />
        <Route path="/order/success/:orderId" element={
          <ProtectedRoute>
            <SuccessPage />
          </ProtectedRoute>
        } />
        <Route path="/order/:orderId/track" element={
          <ProtectedRoute>
            <TrackOrderPage />
          </ProtectedRoute>
        } />

      </Routes>

      <ToastContainer position="top-right" />
      <Footer />
    </>
  )
}

export default App
