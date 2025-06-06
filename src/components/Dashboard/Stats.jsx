

// import { useEffect, useState } from "react";
// import styles from "./stats.module.css";
// import { Users, Package, Gift, ClipboardList, Tags, Layers, HelpCircle, Bell } from "lucide-react";

// const Stats = () => {
//   const [stats, setStats] = useState({
//     categoryCount: 0,
//     subCategoryCount: 0,
//     userCount: 0,
//     productCount: 0,
//     orderCount: 0,
//     couponCount: 0,
//     queryCount: 0,
//     subscriberCount: 0,
//   });

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Get token from local storage
//       const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/counts`; // Get base URL from .env

//       const response = await fetch(apiUrl, {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`, // Attach the token in the Authorization header
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const data = await response.json();
//       setStats({
//         categoryCount: data.categoryCount,
//         subCategoryCount: data.subCategoryCount,
//         userCount: data.userCount,
//         productCount: data.productCount,
//         orderCount: data.orderCount,
//         couponCount: data.couponCount,
//         queryCount: data.queryCount,
//         subscriberCount: data.subscriberCount,
//       });
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStats(); // Fetch the stats when the component mounts
//   }, []);

//   const statsData = [
//     { title: "Customers", value: stats.userCount, icon: <Users className={styles.iconUsers} /> },
//     { title: "Products", value: stats.productCount, icon: <Package className={styles.iconProducts} /> },
//     { title: "Coupons", value: stats.couponCount, icon: <Gift className={styles.iconCoupons} /> },
//     { title: "Orders", value: stats.orderCount, icon: <ClipboardList className={styles.iconOrders} /> },
//     { title: "Category", value: stats.categoryCount, icon: <Tags className={styles.iconCategory} /> },
//     { title: "Sub Category", value: stats.subCategoryCount, icon: <Layers className={styles.iconSubCategory} /> },
//     { title: "Queries", value: stats.queryCount, icon: <HelpCircle className={styles.iconQueries} /> },
//     { title: "Subscribers", value: stats.subscriberCount, icon: <Bell className={styles.iconSubscribers} /> },
//   ];

//   return (
//     <div className={styles.statsContainer}>
//       {statsData.map((stat, index) => (
//         <div key={index} className={styles.statCard}>
//           <div className={styles.statInfo}>
//             <h3>{stat.title}</h3>
//             <h2>{stat.value}</h2>
//           </div>
//           <div className={styles.iconContainer}>{stat.icon}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Stats;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <-- Add this
import styles from "./stats.module.css";
import {
  Users,
  Package,
  Gift,
  ClipboardList,
  Tags,
  Layers,
  HelpCircle,
  Bell,
} from "lucide-react";

const Stats = () => {
  const [stats, setStats] = useState({
    categoryCount: 0,
    subCategoryCount: 0,
    userCount: 0,
    productCount: 0,
    orderCount: 0,
    couponCount: 0,
    queryCount: 0,
    subscriberCount: 0,
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/counts`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setStats({
        categoryCount: data.categoryCount,
        subCategoryCount: data.subCategoryCount,
        userCount: data.userCount,
        productCount: data.productCount,
        orderCount: data.orderCount,
        couponCount: data.couponCount,
        queryCount: data.queryCount,
        subscriberCount: data.subscriberCount,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statsData = [
    { title: "Customers", value: stats.userCount, icon: <Users className={styles.iconUsers} />, path: "/admin/user" },
    { title: "Products", value: stats.productCount, icon: <Package className={styles.iconProducts} />, path: "/admin/products" },
    { title: "Coupons", value: stats.couponCount, icon: <Gift className={styles.iconCoupons} />, path: "/admin/coupons" },
    { title: "Orders", value: stats.orderCount, icon: <ClipboardList className={styles.iconOrders} />, path: "/admin/order" },
    { title: "Category", value: stats.categoryCount, icon: <Tags className={styles.iconCategory} />, path: "/admin/category" },
    { title: "Sub Category", value: stats.subCategoryCount, icon: <Layers className={styles.iconSubCategory} />, path: "/admin/subcategory" },
    { title: "Queries", value: stats.queryCount, icon: <HelpCircle className={styles.iconQueries} />, path: "/admin/query" },
    { title: "Subscribers", value: stats.subscriberCount, icon: <Bell className={styles.iconSubscribers} />, path: "/admin/subscriptions" },
  ];

  return (
    <div className={styles.statsContainer}>
      {statsData.map((stat, index) => (
        <Link key={index} to={stat.path} className={styles.statLink}>
          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <h3>{stat.title}</h3>
              <h2>{stat.value}</h2>
            </div>
            <div className={styles.iconContainer}>{stat.icon}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Stats;
