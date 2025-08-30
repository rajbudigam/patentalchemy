import * as React from "react";
import { motion } from "framer-motion";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  glow?: boolean;
  children: React.ReactNode;
};

export default function DopamineButton({ glow = true, children, className = "", ...rest }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`dopamine-btn relative overflow-hidden rounded-xl2 px-4 py-3 text-sm font-medium ${className}`}
      {...rest}
    >
      {glow && <span className="absolute inset-0 -z-10 btn-glow" />}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

