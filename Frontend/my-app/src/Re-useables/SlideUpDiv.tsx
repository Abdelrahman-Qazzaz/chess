import React, { ReactNode, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
function SlideUpDiv(props: {
  children: ReactNode;
  style?: any;
  className?: string;
}) {
  const childrenContainerRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      initial={{
        y: `-70vh`,
      }}
      animate={{ y: "0" }}
      transition={{ stiffness: "100", type: "spring", duration: 0.1 }}
      exit={{
        y: `-100vh`,
      }}
      style={{ ...props.style }}
      className={`${props.className}`}
    >
      {props.children}
    </motion.div>
  );
}

export default SlideUpDiv;
