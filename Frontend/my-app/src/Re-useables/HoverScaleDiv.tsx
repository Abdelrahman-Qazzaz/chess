import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import "../App.css";
function HoverScaleDiv({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style: any;
  onClick: any;
  className: string;
}) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      exit={{ scale: 1 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default HoverScaleDiv;
