import React from "react"
import styles from "./Column.module.css"

interface PropsTypes {
  children?: React.ReactNode
}

export default ({ children }: PropsTypes) => {
  return <div className={styles.column}>{children}</div>
}
