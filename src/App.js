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
          <Route path="/laundry/admin" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/subcategory" element={<SubCategoryPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/subscriptions" element={<SubscriptionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/query" element={<QueryPage />} />
          <Route path="/coupons" element={<CouponPage />} />




        </Routes>
      </Router>
    </div>
  );
}

export default App;