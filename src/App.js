import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login/Login';
import DashboardPage from './pages/Dashboard';
import OrderPage from './pages/Order';
import UserPage from './pages/User Management'
import CategoryPage from './pages/Category'
import SubCategoryPage from './pages/SubCategory';
import ProductPage from './pages/Product Management';
import SubscriptionPage from './pages/Subscription';
import ProfilePage from './pages/Profile';
import QueryPage from './pages/Query';
import CouponPage from './pages/Coupons Management'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/order" element={<OrderPage />} />
          <Route path="/admin/user" element={<UserPage />} />
          <Route path="/admin/category" element={<CategoryPage />} />
          <Route path="/admin/subcategory" element={<SubCategoryPage />} />
          <Route path="/admin/products" element={<ProductPage />} />
          <Route path="/admin/subscriptions" element={<SubscriptionPage />} />
          <Route path="/admin/profile" element={<ProfilePage />} />
          <Route path="/admin/query" element={<QueryPage />} />
          <Route path="/admin/coupons" element={<CouponPage />} />




        </Routes>
      </Router>
    </div>
  );
}

export default App;