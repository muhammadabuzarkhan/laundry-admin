// components/SubscriptionsOverview.tsx

import styles from "./Overview.module.css"
import { Link } from "react-router-dom"
import { CheckCircle, Clock, XCircle, ArrowRight } from "lucide-react"

const SubscriptionsOverview = () => {
  const subscriptionStatuses = [
    { status: "Active", count: 28, icon: <CheckCircle className={styles.iconActive} /> },
    { status: "Paused", count: 5, icon: <Clock className={styles.iconPaused} /> },
    { status: "Cancelled", count: 12, icon: <XCircle className={styles.iconCancelled} /> },
  ]

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.overviewHeader}>
        <h2>Subscriptions Overview</h2>
        <Link to="/subscriptions" className={styles.viewAllBtn}>
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

export default SubscriptionsOverview
