import React from "react"
import styles from "./Container.module.css"

interface PropsTypes {
  children?: React.ReactNode
}

export default ({ children }: PropsTypes) => {
  return <div className={styles.container}>{children}</div>
}
