import React from "react"
import Blockies from "Hooks/Blockies"
import styles from "./Avatar.module.css"

interface PropsTypes {
  randomString: string
}

export default ({ randomString }: PropsTypes) => {
  const src = Blockies(randomString)
  return <img className={styles.avatar} src={src} />
}
