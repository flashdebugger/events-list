import React from "react"
import styles from "./ListItems.module.css"

interface PropsTypes {
  children?: React.ReactNode
}

export default ({ children }: PropsTypes) => {
  return <div className={styles.listItems}>{children}</div>
}
