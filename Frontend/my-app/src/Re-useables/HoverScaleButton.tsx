import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import "../App.css";
function HoverScaleButton({
  children,
  style,
  onClick,
  className,
  name,
}: {
  children: ReactNode;
  style?: any;
  onClick: any;
  className?: string;
  name?: string;
}) {
  return (
    <motion.button
      name={name}
      onClick={onClick}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      exit={{ scale: 1 }}
      className={className}
      style={style}
    >
      {children}
    </motion.button>
  );
}

export default HoverScaleButton;
