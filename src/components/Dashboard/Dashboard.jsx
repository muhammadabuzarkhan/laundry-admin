import styles from "./Dashboard.module.css"
import Stats from "./Stats"
import OrdersOverview from "./OrderOverview"
import SubscriptionsOverview from "./SubscriptionOverview"
import { Plus, ArrowRight } from "lucide-react"

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1>Dashboard</h1>
        
      </div>

      <Stats />

      <div className={styles.overviewsContainer}>
        <div className={styles.overviewColumn}>
          <OrdersOverview />
        </div>
        <div className={styles.overviewColumn}>
          <SubscriptionsOverview />
        </div>
      </div>

      <div className={styles.recentOrdersSection}>
        <div className={styles.recentOrdersHeader}>
          <h2>Recent Orders</h2>
          <button className={styles.viewAllBtn}>
            View all <ArrowRight size={16} />
          </button>
        </div>
        {/* Recent orders table would go here */}
      </div>
    </div>
  )
}

export default Dashboard
