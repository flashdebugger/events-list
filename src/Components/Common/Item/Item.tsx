import React from "react"
import styles from "./Item.module.css"

interface PropsTypes {
  children?: React.ReactNode
}

export default ({ children }: PropsTypes) => {
  return <div className={styles.item}>{children}</div>
}
