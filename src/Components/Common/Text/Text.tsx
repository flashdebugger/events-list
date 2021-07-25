import React from "react"
import styles from "./Text.module.css"

interface PropsTypes {
  children?: React.ReactNode
  className?: string
}

export default ({ children, className = "primary" }: PropsTypes) => {
  return <span className={styles[className]}>{children}</span>
}
