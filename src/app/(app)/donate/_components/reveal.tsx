"use client"

import { motion } from "framer-motion"

export default function Reveal(props: { children: React.ReactNode; index: number }) {
  return (
    <div>
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          delay: (props.index % 4) * 0.1,
        }}
        viewport={{ once: true }}
      >
        {props.children}
      </motion.div>
    </div>
  )
}
