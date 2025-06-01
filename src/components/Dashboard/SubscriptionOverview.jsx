
// import styles from "./Overview.module.css"
// import { Link } from "react-router-dom"
// import { CheckCircle, Clock, XCircle, ArrowRight } from "lucide-react"

// const CallOrder = () => {
//   const subscriptionStatuses = [
//     { status: "Processing", count: 28, icon: <CheckCircle className={styles.iconActive} /> },
//     { status: "Pending", count: 5, icon: <Clock className={styles.iconPaused} /> },
//     { status: "Completed", count: 12, icon: <XCircle className={styles.iconCancelled} /> },
//   ]

//   return (
//     <div className={styles.overviewContainer}>
//       <div className={styles.overviewHeader}>
//         <h2>Call Orders</h2>
//         <Link to="/admin/call-order" className={styles.viewAllBtn}>
//           View all <ArrowRight size={16} />
//         </Link>
//       </div>

//       <div className={styles.statusList}>
//         {subscriptionStatuses.map((item, index) => (
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

// export default CallOrder

import { useEffect, useState } from "react"
import styles from "./Overview.module.css"
import { Link } from "react-router-dom"
import { CheckCircle, Clock, XCircle, ArrowRight } from "lucide-react"

const CallOrder = () => {
  const [data, setData] = useState({
    processing: 0,
    pending: 0,
    completed: 0,
  })

  useEffect(() => {
    const fetchCallOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/callorder/status-counts`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Failed to fetch call orders:", error)
      }
    }

    fetchCallOrders()
  }, [])

  const subscriptionStatuses = [
    { status: "Processing", count: data.processing, icon: <CheckCircle className={styles.iconActive} /> },
    { status: "Pending", count: data.pending, icon: <Clock className={styles.iconPaused} /> },
    { status: "Completed", count: data.completed, icon: <XCircle className={styles.iconCancelled} /> },
  ]

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.overviewHeader}>
        <h2>Call Orders</h2>
        <Link to="/admin/call-order" className={styles.viewAllBtn}>
          View all <ArrowRight size={16} />
        </Link>
      </div>

      <div className={styles.statusList}>
        {subscriptionStatuses.map((item, index) => (
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

export default CallOrder
