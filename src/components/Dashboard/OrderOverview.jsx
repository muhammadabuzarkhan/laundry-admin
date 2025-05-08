import styles from "./Overview.module.css"
import { Clock, RefreshCw, CheckCircle, XCircle, ArrowRight } from "lucide-react"

const OrdersOverview = () => {
  const orderStatuses = [
    { status: "Pending", count: 12, icon: <Clock className={styles.iconPending} /> },
    { status: "Processing", count: 8, icon: <RefreshCw className={styles.iconProcessing} /> },
    { status: "Completed", count: 105, icon: <CheckCircle className={styles.iconCompleted} /> },
    { status: "Cancelled", count: 3, icon: <XCircle className={styles.iconCancelled} /> },
  ]

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.overviewHeader}>
        <h2>Orders Overview</h2>
        <button className={styles.viewAllBtn}>
          View all <ArrowRight size={16} />
        </button>
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
