// import styles from "./Overview.module.css"
// import { Clock, RefreshCw, CheckCircle, XCircle, ArrowRight } from "lucide-react"
// import { Link } from "react-router-dom"

// const OrdersOverview = () => {
//   const orderStatuses = [
//     { status: "Pending", count: 12, icon: <Clock className={styles.iconPending} /> },
//     { status: "Completed", count: 105, icon: <CheckCircle className={styles.iconCompleted} /> },
//   ]

//   return (
//     <div className={styles.overviewContainer}>
//       <div className={styles.overviewHeader}>
//         <h2>Orders Overview</h2>
    
//         <Link to="/order" className={styles.viewAllBtn}>
//                   View all <ArrowRight size={16} />
//                 </Link>
//       </div>

//       <div className={styles.statusList}>
//         {orderStatuses.map((item, index) => (
//           <div key={index} className={styles.statusItem}>
//             <div className={styles.statusInfo}>
//               {item.icon}
//               <span>{item.status}</span>
//             </div>
//             <div className={styles.statusCount}>{item.count}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default OrdersOverview


import { useEffect, useState } from "react"
import styles from "./Overview.module.css"
import { Clock, CheckCircle, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const OrdersOverview = () => {
  const [orderStatuses, setOrderStatuses] = useState([
    { status: "Pending", count: 0, icon: <Clock className={styles.iconPending} /> },
    { status: "Completed", count: 0, icon: <CheckCircle className={styles.iconCompleted} /> },
  ])

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${process.env.REACT_APP_BASE_URL_Local}/api/admin/auth/order/getstatus`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        const data = await response.json()

        if (data.status && data.data) {
          setOrderStatuses([
            {
              status: "Pending",
              count: data.data.pending,
              icon: <Clock className={styles.iconPending} />
            },
            {
              status: "Completed",
              count: data.data.completed,
              icon: <CheckCircle className={styles.iconCompleted} />
            }
          ])
        }
      } catch (error) {
        console.error("Failed to fetch order status:", error)
      }
    }

    fetchOrderStatus()
  }, [])

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.overviewHeader}>
        <h2>Orders Overview</h2>
        <Link to="/admin/order" className={styles.viewAllBtn}>
          View all <ArrowRight size={16} />
        </Link>
      </div>

      <div className={styles.statusList}>
        {orderStatuses.map((item, index) => (
          <div key={index} className={styles.statusItem}>
            <div className={styles.statusInfo}>
              {item.icon}
              <span>{item.status}</span>
            </div>
            <div className={styles.statusCount}>{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersOverview
