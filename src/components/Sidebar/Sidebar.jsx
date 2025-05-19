// import styles from "./Sidebar.module.css"
// import { Package, Home, ClipboardList, Repeat, ShoppingBag, Users, Gift, BarChart2, User, LogOut } from "lucide-react"

// const Sidebar = () => {
//   return (
//     <div className={styles.sidebar}>
//       <div className={styles.logo}>
//         <Package className={styles.logoIcon} />
//         <h1>Laundry Admin</h1>
//       </div>

//       <nav className={styles.navigation}>
//         <ul>
//           <li className={styles.active}>
//             <Home className={styles.icon} />
//             <span>Dashboard</span>
//           </li>
//           <li>
//             <ClipboardList className={styles.icon} />
//             <span>Orders</span>
//           </li>
//           <li>
//             <Repeat className={styles.icon} />
//             <span>Subscriptions</span>
//           </li>
//           <li>
//             <ShoppingBag className={styles.icon} />
//             <span>Product Management</span>
//           </li>
//           <li>
//             <Users className={styles.icon} />
//             <span>Customers</span>
//           </li>
//           <li>
//             <Gift className={styles.icon} />
//             <span>Coupons</span>
//           </li>
//           <li>
//             <BarChart2 className={styles.icon} />
//             <span>Reports</span>
//           </li>
//           <li>
//             <User className={styles.icon} />
//             <span>Profile</span>
//           </li>
//           <li>
//             <LogOut className={styles.icon} />
//             <span>Logout</span>
//           </li>
//         </ul>
//       </nav>

//       <div className={styles.adminUser}>
//         <div className={styles.adminAvatar}>
//           <Users className={styles.avatarIcon} />
//         </div>
//         <div className={styles.adminInfo}>
//           <h3>Admin User</h3>
//           <p>admin@laundry.com</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Sidebar

import { Link } from "react-router-dom"
import styles from "./Sidebar.module.css"
import {
  Package,
  Home,
  ClipboardList,
  Repeat,
  ShoppingBag,
  Users,
  Gift,
  BarChart2,
  User,
  LogOut
} from "lucide-react"

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Package className={styles.logoIcon} />
        <h1>Laundry Admin</h1>
      </div>

      <nav className={styles.navigation}>
        <ul>
          <li className={styles.active}>
            <Link to="/admin/dashboard">
              <Home className={styles.icon} />
              <span>Dashboard</span>
            </Link>
          </li>
         
          <li>
            <Link to="/admin/user">
              <Users className={styles.icon} />
              <span>Customers</span>
            </Link>
          </li>
         
          <li>
            <Link to="/admin/category">
              <BarChart2 className={styles.icon} />
              <span>Category</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/subcategory">
              <User className={styles.icon} />
              <span>Sub Category</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/order">
              <ClipboardList className={styles.icon} />
              <span>Orders</span>
            </Link>
          </li>

           <li>
            <Link to="/admin/call-order">
              <Repeat className={styles.icon} />
              <span>Call Order</span>
            </Link>
          </li>
         
          <li>
            <Link to="/admin/products">
              <ShoppingBag className={styles.icon} />
              <span>Products </span>
            </Link>
          </li>
          <li>
            <Link to="/admin/coupons">
              <Gift className={styles.icon} />
              <span>Coupons</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/subscriptions">
              <Repeat className={styles.icon} />
              <span>Subscriptions</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/query">
              <Repeat className={styles.icon} />
              <span>Query Management</span>
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <LogOut className={styles.icon} />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>

    <li>
      <Link to="/admin/profile">
      <div className={styles.adminUser}>
        <div className={styles.adminAvatar}>
          <Users className={styles.avatarIcon} />
        </div>
        <div className={styles.adminInfo}>
          <h3>Admin User</h3>
          <p>admin@laundry.com</p>
        </div>
      </div></Link>
    </li>
    </div>
  )
}

export default Sidebar
