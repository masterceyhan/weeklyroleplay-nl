"use client"

import { motion } from "framer-motion"

export default function Template(props: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.25 }}
    >
      {props.children}
    </motion.div>
  )
}